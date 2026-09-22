import nodemailer from "nodemailer";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "ronron201907@gmail.com";
const MAX_FIELD_LENGTH = 2000;

function trim(str, max = MAX_FIELD_LENGTH) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

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
  const category = trim(body.category, 80) || "お問い合わせ";
  const message = trim(body.message, MAX_FIELD_LENGTH);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "必須項目が不足しています。" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "メールアドレスの形式が正しくありません。" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
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

  try {
    await transporter.sendMail({
      from: `"ロンスケ＋ジュール お問い合わせ" <${gmailUser}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[ロンスケ＋ジュール] ${category} — ${name}`,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact mail error", err);
    return res.status(500).json({
      ok: false,
      error: "メールの送信に失敗しました。時間をおいて再度お試しください。",
    });
  }
}
