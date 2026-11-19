"""新しいパンフレット原稿を基本に、UD文言・正規QR・連絡先・ロゴフッターを合成する。"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas as pdf_canvas

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "public" / "docs"
BASE = DOCS / "_base_hires.png"
OUT_PNG = DOCS / "sawakai-pamphlet.png"
OUT_PDF = DOCS / "sawakai-pamphlet.pdf"

TEAL = (45, 110, 100)
INK = (40, 70, 65)
MUTED = (90, 110, 105)
BROWN = (90, 70, 60)
WHITE = (255, 255, 255)
CREAM = (255, 252, 245)
CARD_BG = (253, 251, 236)
FOOTER_BG = (12, 12, 12)

FONT_R = r"C:\Windows\Fonts\YuGothR.ttc"
FONT_M = r"C:\Windows\Fonts\YuGothM.ttc"
FONT_B = r"C:\Windows\Fonts\YuGothB.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size, index=0)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_centered(draw, cx, y, text, fnt, fill):
    tw, th = text_size(draw, text, fnt)
    draw.text((cx - tw / 2, y), text, font=fnt, fill=fill)
    return th


def cover_rect(draw, box, fill):
    draw.rectangle(box, fill=fill)


def paste_qr(base: Image.Image, qr_path: Path, box):
    x0, y0, x1, y1 = box
    size = min(x1 - x0, y1 - y0)
    cx = (x0 + x1) // 2
    cy = (y0 + y1) // 2
    half = size // 2
    sx0, sy0 = cx - half, cy - half
    pad = 10
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(
        (sx0 - pad, sy0 - pad, sx0 + size + pad, sy0 + size + pad),
        radius=12,
        fill=WHITE,
    )
    qr = Image.open(qr_path).convert("RGB").resize((size, size), Image.Resampling.LANCZOS)
    base.paste(qr, (sx0, sy0))


def main():
    base = Image.open(BASE).convert("RGB")
    w, h = base.size
    draw = ImageDraw.Draw(base)

    # 1) 「大きな文字」カード説明をUD訴求に差し替え（カード背景色に合わせてなじませる）
    cover_rect(draw, (1000, 1506, 1460, 1595), CARD_BG)
    card_f = font(FONT_M, 26)
    draw.text((1025, 1514), "文字の大きさを選べます。", font=card_f, fill=TEAL)
    draw.text((1025, 1552), "ユニバーサルデザイン対応。", font=card_f, fill=TEAL)

    # 2) CTAサブ文をUD込みに差し替え（原稿の無料訴求は維持）
    cover_rect(draw, (240, 1710, w - 240, 1795), WHITE)
    draw_centered(
        draw,
        w / 2,
        1716,
        "アプリのダウンロード不要・無料で今すぐ画面を体験できます",
        font(FONT_M, 26),
        BROWN,
    )
    draw_centered(
        draw,
        w / 2,
        1756,
        "ユニバーサルデザインで、見えにくい方でも楽に使えます",
        font(FONT_B, 27),
        TEAL,
    )

    # 3) 恐竜アイコン入りの仮QRを正規QRへ置換
    paste_qr(base, DOCS / "qr-sawakai.png", (393, 1925, 624, 2138))
    paste_qr(base, DOCS / "qr-ron-home.png", (1159, 1925, 1390, 2137))

    # 4) 「[ご連絡先を記入]」を実連絡先へ（枠内に収めて下辺を描き直す）
    cover_rect(draw, (150, 2305, w - 150, 2390), WHITE)
    draw_centered(
        draw,
        w / 2,
        2312,
        "お問い合わせ：ronron201907@gmail.com",
        font(FONT_M, 26),
        INK,
    )
    draw_centered(
        draw,
        w / 2,
        2348,
        "https://ron-home-app.vercel.app/",
        font(FONT_R, 24),
        MUTED,
    )
    # CTA枠の下辺を復元
    border = (68, 112, 97)
    draw.rounded_rectangle((124, 1633, w - 124, 2382), radius=28, outline=border, width=4)
    # 枠外はクリームに戻す（下余白）
    cover_rect(draw, (0, 2386, w, h), CREAM)

    # 5) 最下部にロンAIシステムズのロゴ＋URL＋Mail
    footer_h = 168
    canvas = Image.new("RGB", (w, h + footer_h), CREAM)
    canvas.paste(base, (0, 0))
    draw2 = ImageDraw.Draw(canvas)
    fy0 = h + 10
    draw2.rounded_rectangle((48, fy0, w - 48, h + footer_h - 14), radius=22, fill=FOOTER_BG)

    logo = Image.open(DOCS / "ron-ai-systems-logo.png").convert("RGBA")
    logo_h = 96
    logo_w = int(logo.width * (logo_h / logo.height))
    logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    lx = 78
    ly = fy0 + (footer_h - 24 - logo_h) // 2
    layer = canvas.crop((lx, ly, lx + logo_w, ly + logo_h)).convert("RGBA")
    layer.paste(logo, (0, 0), logo)
    canvas.paste(layer.convert("RGB"), (lx, ly))

    tx = lx + logo_w + 28
    draw2.text((tx, fy0 + 32), "ロンAIシステムズ", font=font(FONT_B, 28), fill=WHITE)
    draw2.text((tx, fy0 + 72), "https://ron-home-app.vercel.app/", font=font(FONT_R, 22), fill=(220, 220, 220))
    draw2.text((tx, fy0 + 104), "ronron201907@gmail.com", font=font(FONT_R, 22), fill=(220, 220, 220))

    out_img = canvas.resize((1240, int(1240 * canvas.height / canvas.width)), Image.Resampling.LANCZOS)
    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    out_img.save(OUT_PNG, "PNG", optimize=True)
    print("wrote", OUT_PNG, out_img.size)

    a4_w, a4_h = 595.27, 841.89
    c = pdf_canvas.Canvas(str(OUT_PDF), pagesize=(a4_w, a4_h))
    margin = 8
    avail_w = a4_w - margin * 2
    avail_h = a4_h - margin * 2
    iw, ih = canvas.size
    scale = min(avail_w / iw, avail_h / ih)
    dw, dh = iw * scale, ih * scale
    x = (a4_w - dw) / 2
    y = (a4_h - dh) / 2
    c.drawImage(ImageReader(canvas), x, y, width=dw, height=dh, preserveAspectRatio=True, mask="auto")
    c.save()
    print("wrote", OUT_PDF)


if __name__ == "__main__":
    main()
