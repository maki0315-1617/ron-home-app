import nodemailer from "nodemailer";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "ronron201907@gmail.com";
const MAX_FIELD_LENGTH = 2000;

/** 件名・本文に出す種別の表示名（値はそのまま残す） */
const CATEGORY_LABELS = {
  個別見積依頼: "個別見積依頼",
  資料請求: "資料請求",
  茶話会許可コード請求: "茶話会許可コード請求",
  デモ・トライアル: "デモ・トライアル",
  導入相談: "導入相談",
  請求・契約: "請求・契約",
  その他: "その他",
  サブスク解除申請: "サブスク解除申請",
  custom_quote: "個別見積依頼",
  materials: "資料請求",
  permission_code: "茶話会許可コード請求",
  demo: "デモ・トライアル",
  onboarding: "導入相談",
  billing: "請求・契約",
  other: "その他",
  subscription_cancel: "サブスク解除申請",
};

function trim(str, max = MAX_FIELD_LENGTH) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function categoryLabel(category) {
  const key = trim(category, 80);
  if (!key) return "お問い合わせ";
  return CATEGORY_LABELS[key] || key;
}

/** 件名用に改行・制御文字を除き、長すぎる場合は切る */
function safeSubjectPart(value, max = 80) {
  return String(value || "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const gmailUser = trim(process.env.GMAIL_USER || "", 254);
  // アプリパスワードはスペース付きで貼られることがあるため除去する
  const gmailPass = String(process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");

  if (!gmailUser || !gmailPass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return res.status(503).json({
      ok: false,
      error:
        "メール送信の設定が完了していません。Vercel の環境変数 GMAIL_USER / GMAIL_APP_PASSWORD を設定してください。",
    });
  }

  let body = req.body ?? {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const name = trim(body.name, 120);
  const email = trim(body.email, 254);
  const company = trim(body.company, 200);
  const categoryRaw = trim(body.category, 80) || "お問い合わせ";
  const category = categoryLabel(categoryRaw);
  const message = trim(body.message, MAX_FIELD_LENGTH);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "必須項目が不足しています。" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "メールアドレスの形式が正しくありません。" });
  }

  // service: "gmail" より明示設定の方がアプリパスワード運用で安定しやすい
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const text = [
    "ロンスケ＋ジュール お問い合わせフォームより",
    "",
    `種別: ${category}`,
    `お名前: ${name}`,
    `メール: ${email}`,
    `会社・団体: ${company || "（未入力）"}`,
    "",
    "--- お問い合わせ内容 ---",
    message,
    "",
    `送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
  ].join("\n");

  const subject = `[ロンスケ＋ジュール] ${safeSubjectPart(category, 40)} - ${safeSubjectPart(name, 40)}`;

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact mail error", {
      code: err?.code,
      responseCode: err?.responseCode,
      command: err?.command,
      message: err?.message,
    });
    return res.status(500).json({
      ok: false,
      error: "メールの送信に失敗しました。時間をおいて再度お試しください。",
    });
  }
}
