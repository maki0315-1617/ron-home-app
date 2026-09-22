import { useState, useEffect, useCallback } from "react";

const SITE_URL = "https://ron-home-app.vercel.app";
const DEMO_APP_URL = "https://ron-sch.vercel.app/";

const COMPANY = {
  name: "合同会社ロンシステムズ",
  nameEn: "Ron Systems LLC",
  product: "ロンスケ＋ジュール",
  productEn: "Ron Schedule+",
  address: "〒920-0869 石川県金沢市本町二丁目15番1号 ロンビル5階",
  phone: "0120-867-309",
  phoneHours: "平日 10:00〜17:00（土日祝・年末年始を除く）",
  email: "ronron201907@gmail.com",
  representative: "代表社員 ロン・マキノ（架空）",
  established: "2024年4月1日",
};

const NAV_ITEMS = [
  { id: "top", label: "トップ" },
  { id: "features", label: "機能・特徴" },
  { id: "demo", label: "デモ" },
  { id: "pricing", label: "料金" },
  { id: "contact", label: "お問い合わせ" },
  { id: "company", label: "会社情報" },
  { id: "tokusho", label: "特定商取引法" },
  { id: "privacy", label: "個人情報保護方針" },
  { id: "terms", label: "利用規約" },
];

const themeColor = "#fca311";
const darkColor = "#14213d";

function SectionCard({ id, title, icon, children, style }) {
  return (
    <section
      id={id}
      style={{
        scrollMarginTop: "88px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "28px 22px",
        marginBottom: "32px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      <h2
        style={{
          margin: "0 0 18px",
          fontSize: "22px",
          color: darkColor,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span aria-hidden="true">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function LegalBlock({ title, paragraphs }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <h3 style={{ fontSize: "16px", margin: "0 0 8px", color: darkColor }}>{title}</h3>
      {paragraphs.map((text, i) => (
        <p key={i} style={{ margin: "0 0 10px", lineHeight: 1.75, color: "#444", fontSize: "14px" }}>
          {text}
        </p>
      ))}
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    category: "資料請求",
    message: "",
    agree: false,
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes slideIn {
        0% { transform: translateX(-100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      .slide-menu { animation: slideIn 0.35s ease-out; }
      .cta-button:hover { filter: brightness(1.05); transform: translateY(-1px); }
      .scroll-top-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.18); }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError("お名前・メールアドレス・お問い合わせ内容は必須です。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormError("メールアドレスの形式を確認してください。");
      return;
    }
    if (!form.agree) {
      setFormError("個人情報保護方針への同意が必要です。");
      return;
    }

    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          category: form.category,
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "送信に失敗しました。しばらくしてから再度お試しください。");
      }
      setFormStatus("sent");
    } catch (err) {
      setFormStatus("idle");
      setFormError(err.message || "送信に失敗しました。");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontWeight: 600,
    marginBottom: "6px",
    fontSize: "14px",
    color: darkColor,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #e9d5ff 0%, #bfdbfe 35%, #f3f4f6 100%)",
        color: darkColor,
        fontFamily:
          '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      }}
    >
      <header
        style={{
          backgroundColor: darkColor,
          color: "#fff",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
          }}
        >
          <img
            src="/ron.png"
            alt=""
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              padding: "2px",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "17px", lineHeight: 1.3 }}>
            {COMPANY.product}
            <span style={{ display: "block", fontSize: "10px", opacity: 0.85, fontWeight: 500 }}>
              {COMPANY.name} / {COMPANY.nameEn}
            </span>
          </span>
        </button>

        <a
          href={DEMO_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
          style={{
            display: "none",
            backgroundColor: themeColor,
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "13px",
            whiteSpace: "nowrap",
            transition: "transform 0.2s ease",
          }}
          id="header-demo-cta"
        >
          デモを試す
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="メニューを開く"
          className="menu-button"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "26px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: "70px",
              backgroundColor: "rgba(0,0,0,0.35)",
              border: "none",
              zIndex: 998,
              cursor: "pointer",
            }}
          />
          <nav
            className="slide-menu"
            aria-label="サイト内メニュー"
            style={{
              backgroundColor: darkColor,
              position: "fixed",
              top: "70px",
              left: 0,
              width: "min(320px, 88vw)",
              maxHeight: "calc(100vh - 70px)",
              overflowY: "auto",
              padding: "16px 18px 24px",
              zIndex: 999,
              borderTop: `2px solid ${themeColor}`,
            }}
          >
            <p style={{ color: themeColor, fontWeight: "bold", margin: "0 0 12px", fontSize: "14px" }}>
              サイト内リンク
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  padding: "11px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                {item.label}
              </button>
            ))}
            <a
              href={DEMO_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                marginTop: "16px",
                backgroundColor: themeColor,
                color: "#fff",
                textAlign: "center",
                padding: "12px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              デモアプリを開く ↗
            </a>
          </nav>
        </>
      )}

      <main style={{ maxWidth: "920px", margin: "0 auto", padding: "32px 18px 48px" }}>
        <section
          id="top"
          style={{
            scrollMarginTop: "88px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "36px 24px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(20,33,61,0.08)",
            marginBottom: "36px",
            border: `2px solid ${themeColor}`,
          }}
        >
          <img
            src="/ron.png"
            alt="ロンスケ＋ジュールのマスコット"
            style={{ width: "120px", height: "120px", objectFit: "contain", marginBottom: "16px" }}
          />
          <p
            style={{
              display: "inline-block",
              margin: "0 0 12px",
              padding: "6px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(252,163,17,0.15)",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {COMPANY.name}（{COMPANY.nameEn}）提供
          </p>
          <h1 style={{ margin: "0 0 8px", fontSize: "clamp(26px, 5vw, 34px)", lineHeight: 1.35 }}>
            {COMPANY.product}
          </h1>
          <p style={{ margin: "0 0 12px", fontSize: "15px", color: "#666", fontWeight: 600 }}>
            {COMPANY.productEn}
          </p>
          <p style={{ margin: "0 auto 22px", maxWidth: "560px", lineHeight: 1.75, color: "#555" }}>
            予定の登録・確認を、シンプルな操作で。個人のタスク管理から小規模チームの共有まで、
            すぐ使えるスケジュールアプリの公式ポータルサイトです。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <button
              type="button"
              className="cta-button"
              onClick={() => scrollToSection("contact")}
              style={{
                backgroundColor: themeColor,
                color: "#fff",
                border: "none",
                padding: "12px 22px",
                borderRadius: "999px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              お問い合わせ
            </button>
            <a
              href={DEMO_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{
                backgroundColor: "#fff",
                color: darkColor,
                padding: "12px 22px",
                borderRadius: "999px",
                fontWeight: 700,
                textDecoration: "none",
                border: `2px solid ${darkColor}`,
                fontSize: "15px",
              }}
            >
              無料デモを見る ↗
            </a>
          </div>
          <p style={{ marginTop: "18px", fontSize: "12px", color: "#888" }}>
            公式サイト：{" "}
            <a href={SITE_URL} style={{ color: darkColor }}>
              {SITE_URL}
            </a>
          </p>
        </section>

        <SectionCard id="features" title="機能・特徴" icon="✨">
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.85, color: "#444" }}>
            <li>日付単位で予定を素早く追加・編集</li>
            <li>一覧表示で今日・今週の予定をひと目で確認</li>
            <li>ブラウザですぐ利用（インストール不要のWebアプリ）</li>
            <li>シンプルUIで初めての方でも迷いにくい設計</li>
            <li>小規模チーム向けの共有運用にも対応予定（Enterpriseプラン）</li>
          </ul>
        </SectionCard>

        <SectionCard
          id="demo"
          title="デモアプリ"
          icon="📅"
          style={{ background: "linear-gradient(135deg, #fff7ed, #eff6ff)" }}
        >
          <p style={{ lineHeight: 1.75, color: "#444", marginTop: 0 }}>
            実際の操作感はデモ環境でご確認いただけます。本番導入前の評価・社内共有にご利用ください。
          </p>
          <a
            href={DEMO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            style={{
              display: "inline-block",
              backgroundColor: themeColor,
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            ロンスケ＋ジュール デモを開く ↗
          </a>
        </SectionCard>

        <SectionCard id="pricing" title="料金プラン（参考）" icon="💴">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {[
              {
                name: "スタンダード",
                price: "¥980",
                unit: "/ 月（税込・架空）",
                desc: "個人利用向け。基本の予定管理機能",
              },
              {
                name: "ビジネス",
                price: "¥2,980",
                unit: "/ 月（税込・架空）",
                desc: "複数ユーザー・共有カレンダー（提供予定）",
              },
              {
                name: "お問い合わせ",
                price: "個別見積",
                unit: "",
                desc: "オンプレ・カスタマイズ等は別途ご相談",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "18px",
                  backgroundColor: "#fafafa",
                }}
              >
                <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>{plan.name}</h3>
                <p style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: 800, color: themeColor }}>
                  {plan.price}
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#666" }}>{plan.unit}</span>
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "#555", lineHeight: 1.6 }}>{plan.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "14px 0 0", fontSize: "12px", color: "#777" }}>
            ※ 表示料金はLP用の参考値です。正式な販売条件はお問い合わせ時にご案内します。
          </p>
        </SectionCard>

        <SectionCard id="contact" title="お問い合わせ" icon="✉️">
          {formStatus === "sent" ? (
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: "#ecfdf5",
                border: "1px solid #6ee7b7",
                color: "#065f46",
              }}
            >
              <p style={{ margin: 0, fontWeight: 700 }}>お問い合わせを送信しました</p>
              <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: 1.7 }}>
                内容を確認のうえ、担当よりご連絡いたします。お急ぎの場合は下記電話番号までお電話ください。
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormStatus("idle");
                  setForm({
                    name: "",
                    email: "",
                    company: "",
                    category: "資料請求",
                    message: "",
                    agree: false,
                  });
                }}
                style={{
                  marginTop: "14px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid #059669",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                もう一度入力する
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {formError && (
                <p role="alert" style={{ color: "#b91c1c", fontWeight: 600, marginTop: 0 }}>
                  {formError}
                </p>
              )}
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="name" style={labelStyle}>
                  お名前 <span style={{ color: "#b91c1c" }}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="email" style={labelStyle}>
                  メールアドレス <span style={{ color: "#b91c1c" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="company" style={labelStyle}>
                  会社名・団体名（任意）
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="category" style={labelStyle}>
                  お問い合わせ種別
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  <option value="資料請求">資料請求</option>
                  <option value="デモ・トライアル">デモ・トライアル</option>
                  <option value="導入相談">導入相談</option>
                  <option value="請求・契約">請求・契約</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="message" style={labelStyle}>
                  お問い合わせ内容 <span style={{ color: "#b91c1c" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleFormChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <label
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleFormChange}
                  style={{ marginTop: "4px" }}
                />
                <span>
                  <button
                    type="button"
                    onClick={() => scrollToSection("privacy")}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: darkColor,
                      textDecoration: "underline",
                      cursor: "pointer",
                      font: "inherit",
                    }}
                  >
                    個人情報保護方針
                  </button>
                  に同意する <span style={{ color: "#b91c1c" }}>*</span>
                </span>
              </label>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="cta-button"
                style={{
                  backgroundColor: themeColor,
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  cursor: formStatus === "sending" ? "wait" : "pointer",
                  fontSize: "15px",
                  opacity: formStatus === "sending" ? 0.75 : 1,
                }}
              >
                {formStatus === "sending" ? "送信中…" : "送信する"}
              </button>
            </form>
          )}
          <div
            style={{
              marginTop: "22px",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "#f9fafb",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            <p style={{ margin: "0 0 6px", fontWeight: 700 }}>その他の連絡先（架空）</p>
            <p style={{ margin: 0 }}>TEL：{COMPANY.phone}（{COMPANY.phoneHours}）</p>
            <p style={{ margin: "6px 0 0" }}>Mail：{COMPANY.email}</p>
          </div>
        </SectionCard>

        <SectionCard id="company" title="会社情報" icon="🏢">
          <dl style={{ margin: 0, display: "grid", gap: "10px", fontSize: "14px" }}>
            {[
              ["商号", COMPANY.name],
              ["英文表記", COMPANY.nameEn],
              ["代表者", COMPANY.representative],
              ["設立", COMPANY.established],
              ["所在地", COMPANY.address],
              ["電話", `${COMPANY.phone}（${COMPANY.phoneHours}）`],
              ["メール", COMPANY.email],
              ["公式URL", SITE_URL],
              ["提供サービス", `${COMPANY.product}（SaaS型スケジュール管理アプリ）`],
            ].map(([dt, dd]) => (
              <div key={dt} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px" }}>
                <dt style={{ fontWeight: 700, color: darkColor }}>{dt}</dt>
                <dd style={{ margin: 0, color: "#444", lineHeight: 1.6 }}>{dd}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard id="tokusho" title="特定商取引法に基づく表記" icon="📋">
          <p style={{ fontSize: "13px", color: "#666", marginTop: 0 }}>
            通信販売・サービス提供に関する表示（架空のサンプルです）。
          </p>
          <dl style={{ margin: 0, fontSize: "14px", lineHeight: 1.75 }}>
            {[
              ["販売事業者", COMPANY.name],
              ["運営責任者", COMPANY.representative],
              ["所在地", COMPANY.address],
              ["電話番号", `${COMPANY.phone}（${COMPANY.phoneHours}）`],
              ["メールアドレス", COMPANY.email],
              ["販売URL", SITE_URL],
              ["商品代金以外の必要料金", "インターネット接続料金、通信料金等はお客様負担"],
              ["代金の支払方法", "クレジットカード決済、請求書払い（法人向け・条件あり）"],
              ["代金の支払時期", "各プラン申込時および更新日に自動課金（予定）"],
              ["サービス提供時期", "決済確認後、即時またはアカウント発行後"],
              ["返品・キャンセル", "デジタルサービスの性質上、提供開始後の返金は原則不可（詳細は契約書に準ずる）"],
            ].map(([dt, dd]) => (
              <div key={dt} style={{ marginBottom: "12px" }}>
                <dt style={{ fontWeight: 700, color: darkColor }}>{dt}</dt>
                <dd style={{ margin: "4px 0 0", color: "#444" }}>{dd}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard id="privacy" title="個人情報保護方針" icon="🔒">
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#444", marginTop: 0 }}>
            {COMPANY.name}（以下「当社」）は、{COMPANY.product} および本ウェブサイト（{SITE_URL}
            ）において取得する個人情報を、以下のとおり取り扱います。
          </p>
          <LegalBlock
            title="1. 取得する情報"
            paragraphs={[
              "お問い合わせフォーム入力内容（氏名、メールアドレス、会社名、問い合わせ内容等）、アクセスログ（IPアドレス、ブラウザ種別、閲覧日時等）。",
            ]}
          />
          <LegalBlock
            title="2. 利用目的"
            paragraphs={[
              "お問い合わせへの回答、資料送付、サービス提供・保守、利用状況分析、不正利用防止、法令に基づく対応。",
            ]}
          />
          <LegalBlock
            title="3. 第三者提供"
            paragraphs={[
              "法令に基づく場合を除き、本人の同意なく第三者に提供しません。決済・メール配信等の委託先には必要な範囲で預託する場合があります。",
            ]}
          />
          <LegalBlock
            title="4. 安全管理"
            paragraphs={[
              "アクセス制御、通信の暗号化（HTTPS）、権限管理など合理的な安全管理措置を講じます。",
            ]}
          />
          <LegalBlock
            title="5. 開示・訂正・削除等"
            paragraphs={[
              `本人からの請求には、法令に従い速やかに対応します。窓口：${COMPANY.email}`,
            ]}
          />
          <LegalBlock
            title="6. Cookie等"
            paragraphs={[
              "利便性向上およびアクセス解析のためCookie等を使用する場合があります。ブラウザ設定で無効化できます。",
            ]}
          />
          <LegalBlock
            title="7. 改定"
            paragraphs={["本方針は必要に応じて改定します。重要な変更は本サイト上で告知します。"]}
          />
          <p style={{ fontSize: "13px", color: "#777", marginBottom: 0 }}>
            制定日：2026年4月1日 / 最終改定日：2026年9月22日
          </p>
        </SectionCard>

        <SectionCard id="terms" title="利用規約" icon="📜">
          <LegalBlock
            title="第1条（適用）"
            paragraphs={[
              "本規約は、当社が提供するロンスケ＋ジュールおよび関連サービス（以下「本サービス」）の利用条件を定めるものです。",
            ]}
          />
          <LegalBlock
            title="第2条（アカウント）"
            paragraphs={[
              "利用者は正確な情報を登録し、ID・パスワードを適切に管理する責任を負います。",
            ]}
          />
          <LegalBlock
            title="第3条（禁止事項）"
            paragraphs={[
              "法令違反、他者の権利侵害、虚偽登録、不正アクセス、本サービスの運営妨害等を禁止します。",
            ]}
          />
          <LegalBlock
            title="第4条（免責・サービス変更）"
            paragraphs={[
              "当社は、天災・障害等による中断について合理的な範囲で免責されます。機能追加・変更・終了を行う場合があります。",
            ]}
          />
          <LegalBlock
            title="第5条（準拠法・管轄）"
            paragraphs={["本規約は日本法に準拠し、紛争については金沢地方裁判所を第一審の専属的合意管轄とします（架空の例示）。"]}
          />
        </SectionCard>
      </main>

      <footer
        style={{
          backgroundColor: darkColor,
          color: "#cbd5e1",
          padding: "28px 18px 36px",
          fontSize: "13px",
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#fff" }}>
            {COMPANY.name}（{COMPANY.nameEn}）
            <br />
            {COMPANY.product} / {COMPANY.productEn}
          </p>
          <p style={{ margin: "0 0 14px", lineHeight: 1.7 }}>
            {COMPANY.address}
            <br />
            TEL {COMPANY.phone} / {COMPANY.email}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {NAV_ITEMS.filter((n) => n.id !== "top").map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: themeColor,
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p style={{ margin: "18px 0 0", color: "#94a3b8", fontSize: "12px" }}>
            &copy; {new Date().getFullYear()} {COMPANY.nameEn}. All rights reserved.
            <br />
            ※ 住所・電話・代表者名等はLP用の架空情報です。
          </p>
        </div>
      </footer>

      {showScrollTop && (
        <button
          type="button"
          className="scroll-top-btn"
          aria-label="ページトップへ戻る"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            right: "18px",
            bottom: "22px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: themeColor,
            color: "#fff",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            zIndex: 1001,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          ↑
        </button>
      )}

      <style>{`
        @media (min-width: 720px) {
          #header-demo-cta { display: inline-flex !important; }
        }
        @media (max-width: 600px) {
          main { padding: 24px 14px 40px !important; }
        }
      `}</style>
    </div>
  );
}
