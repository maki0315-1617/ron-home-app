import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./i18n/LanguageContext.jsx";
import { getHubContent } from "./i18n/hubContent.js";
import LanguageToggle from "./components/LanguageToggle.jsx";

export default function LegacyHub() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale } = useLanguage();
  const h = getHubContent(locale);
  const {
    vercelLinks,
    workersLinks,
    renderLinks,
    figmaLinks,
    sharedLinks,
  } = h;

  const themeColor = "#fca311";
  const darkColor = "#14213d";

  // 🌟 スライドアニメーションCSS
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-cat-cursor", isMenuOpen);
    return () => document.body.classList.remove("menu-cat-cursor");
  }, [isMenuOpen]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes slideIn {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      .slide-menu {
        animation: slideIn 0.35s ease-out;
      }
      .link-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        border-color: ${themeColor} !important;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d8b4fe, #93c5fd)",
        color: darkColor,
        fontFamily:
          '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      }}
    >
      {/* 🧭 ヘッダー */}
      <header
        style={{
          backgroundColor: darkColor,
          color: "#fff",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <img
            src="/ron.png"
            alt="Ron Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              padding: "2px",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "16px", lineHeight: 1.3 }}>
            {h.siteTitle}
          </span>
        </Link>

        <div
          style={{
            fontWeight: "bold",
            fontSize: "13px",
            opacity: 0.9,
            display: "none",
          }}
          className="hub-subtitle"
        >
          {h.siteSubtitle}
        </div>

        <LanguageToggle compact />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-button"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "28px",
          }}
        >
          {isMenuOpen ? "🐾" : "☰"}
        </button>
      </header>

      {/* 📱 スマホメニュー（スライドイン） */}
      {isMenuOpen && (
        <div
          className="slide-menu"
          style={{
            backgroundColor: darkColor,
            position: "fixed",
            top: "70px",
            right: 0,
            width: "80%",
            height: "80vh",
            overflowY: "auto",
            padding: "20px",
            zIndex: 999,
            borderTop: `2px solid ${themeColor}`,
          }}
        >
          <p style={{ color: themeColor, fontWeight: "bold" }}>
            {h.menuTitle}
          </p>

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "block",
              color: themeColor,
              textDecoration: "none",
              padding: "12px 0",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              fontWeight: "bold",
            }}
          >
            {h.homeLink}
          </Link>

          {sharedLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                fontWeight: "bold",
              }}
            >
              {link.title}
            </a>
          ))}

          <h4 style={{ color: "#fff", marginTop: "20px" }}>{h.sectionLabels.vercel}</h4>
          {vercelLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {link.title}
            </a>
          ))}

          {/* Cloudflare Workers一覧 */}
          <h4 style={{ color: "#fff", marginTop: "20px" }}>{h.sectionLabels.workers}</h4>
          {workersLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {link.title}
            </a>
          ))}

          {/* Render一覧 */}
          <h4 style={{ color: "#fff", marginTop: "20px" }}>{h.sectionLabels.render}</h4>
          {renderLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {link.title}
            </a>
          ))}

          {/* Figma一覧 */}
          <h4 style={{ color: "#fff", marginTop: "20px" }}>{h.sectionLabels.figma}</h4>
          {figmaLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}

      {/* 🏡 メイン */}
      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* 🐈 プロフィール */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
            marginBottom: "40px",
          }}
        >
          <img
            src="/ron.png"
            alt={h.profileAlt}
            style={{
              width: "130px",
              height: "130px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />

          <h2 style={{ marginBottom: "10px", fontSize: "26px" }}>
            {h.profileName}
          </h2>
          <p style={{ marginBottom: "15px", color: "#666" }}>
            {h.profileMeta}
          </p>
          <p style={{ lineHeight: "1.6", color: darkColor }}>
            {h.profileBio}
          </p>
        </div>

        {/* � 共有ページ一覧 */}
        <section
          style={{
            background: "linear-gradient(135deg, #fff7ed, #eff6ff)",
            border: `2px solid ${themeColor}`,
            borderRadius: "18px",
            padding: "24px 20px",
            marginBottom: "35px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <span style={{ fontSize: "28px" }}>🔗</span>
            <h3 style={{ margin: 0, fontSize: "20px", color: darkColor }}>
              {h.sharedTitle}
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {sharedLinks.map((link, idx) => (
              <div
                key={idx}
                className="link-card"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(20,33,61,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  minHeight: "170px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    backgroundColor: "rgba(252,163,17,0.14)",
                    color: darkColor,
                    borderRadius: "999px",
                    padding: "5px 10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {link.badge}
                </span>
                <h4 style={{ margin: 0, fontSize: "18px", color: darkColor }}>
                  {link.title}
                </h4>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.6, flex: 1 }}>
                  {link.description}
                </p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "fit-content",
                    backgroundColor: themeColor,
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {h.openBtn}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "25px 20px",
            marginBottom: "35px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "15px", fontSize: "20px" }}>
            {h.aboutTitle}
          </h3>

          <p>
            <strong>{h.purposeLabel}</strong>
            {h.purposeText}
          </p>

          <div className="env-badges" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", minWidth: "90px", color: "#333" }}>{h.envLabel}</span>
            {[
              { label: "React", url: "https://react.dev" },
              { label: "Next.js", url: "https://nextjs.org" },
              { label: "Vite", url: "https://vitejs.dev" },
              { label: "Vercel", url: "https://vercel.com" },
              { label: "Cloudflare Workers", url: "https://www.cloudflare.com/products/workers" },
              { label: "Render", url: "https://render.com" },
              { label: "Supabase", url: "https://supabase.com" },
              { label: "Firebase", url: "https://firebase.google.com" },
              { label: "MongoDB", url: "https://www.mongodb.com" },
              { label: "GitHub", url: "https://github.com" },
              { label: "Cursor", url: "https://www.cursor.so" },
              { label: "Figma", url: "https://www.figma.com" },
              { label: "VS Code", url: "https://code.visualstudio.com" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="env-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(252,163,17,0.12)",
                  color: themeColor,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: `1px solid ${themeColor}`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(252,163,17,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p style={{ marginTop: "18px" }}>{h.llmNote}</p>

          <p>{h.figmaNote}</p>

          <p style={{ marginTop: "10px", color: "#777" }}>{h.aiNote}</p>
        </section>

        <h3 style={{ marginBottom: "15px" }}>{h.sectionVercel}</h3>
        {vercelLinks.map((link, idx) => (
          <div
            key={idx}
            className="link-card"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              border: "2px solid #eee",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>{h.noteVercel}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: themeColor,
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "20px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {h.openSite}
            </a>
          </div>
        ))}

        <h3 style={{ margin: "30px 0 15px 0" }}>{h.sectionWorkers}</h3>
        {workersLinks.map((link, idx) => (
          <div
            key={idx}
            className="link-card"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              border: "2px solid #eee",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>{h.noteWorkers}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: themeColor,
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "20px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {h.openSite}
            </a>
          </div>
        ))}

        <h3 style={{ margin: "30px 0 15px 0" }}>{h.sectionRender}</h3>
        {renderLinks.map((link, idx) => (
          <div
            key={idx}
            className="link-card"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              border: "2px solid #eee",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>{h.noteRender}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: themeColor,
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "20px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {h.openSite}
            </a>
          </div>
        ))}

        <h3 style={{ margin: "30px 0 15px 0" }}>{h.sectionFigma}</h3>
        {figmaLinks.map((link, idx) => (
          <div
            key={idx}
            className="link-card"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              border: "2px solid #eee",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>{h.noteFigma}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: themeColor,
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "20px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {h.openSite}
            </a>
          </div>
        ))}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "25px 0",
          fontSize: "13px",
          color: "#888",
          backgroundColor: "#fff",
          marginTop: "40px",
        }}
      >
        <p>&copy; {new Date().getFullYear()} ron. All rights reserved.</p>
        <p style={{ fontSize: "12px", color: "#444", margin: "8px 0 0" }}>
          {h.lastChecked}:{" "}
          {new Date().toLocaleDateString(locale === "en" ? "en-US" : "ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <div
          style={{
            marginTop: "14px",
            padding: "14px 16px",
            backgroundColor: "#f9fafb",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            color: "#555",
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 6px", fontWeight: 700 }}>{h.footerHistory}</p>
          <ul style={{ margin: 0, paddingLeft: "18px", color: "#555" }}>
            {h.history.map((line) => (
              <li key={line} style={{ marginBottom: "4px" }}>
                {line}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: "12px", color: "#aaa", margin: "14px 0 0 0" }}>{h.footerAi}</p>
      </footer>

      {/* スマホ用CSS：のハンバーガーだけ制御 */}
      <style>{`
        @media (min-width: 720px) {
          .hub-subtitle { display: block !important; }
        }
        @media (max-width: 600px) {
          .menu-button { display: block; }
          main { padding: 24px 14px !important; }
          .env-badges { gap: 8px; }
          .env-badge {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
}