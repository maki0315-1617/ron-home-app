import { useState, useEffect } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🌟【リンク分類：Vercel / Render / Figma】
  const vercelLinks = [
    {
      title: "🔮 ロン君の運勢占い",
      url: "https://my-js-page.vercel.app",
      desc: "今日のロン君からのメッセージと運勢を占おう！",
    },
    {
      title: "🎮 黒猫ロン君クリックゲーム",
      url: "https://my-react-app-topaz-iota.vercel.app/",
      desc: "画面のロン君をたくさんクリックして遊ぶ楽しいゲーム！",
    },
    {
      title: "🪳 ロン君のゴキ退治",
      url: "https://my-ron-game1-app.vercel.app/",
      desc: "すばやい動きのゴキブリをロン君が退治するアクションゲーム！",
    },
    {
      title: "📅 ロン君お世話カレンダー",
      url: "https://ronron-app.vercel.app/",
      desc: "ロン君の毎日のお世話や体調を優しく管理できるカレンダー！",
    },
    {
      title: "🎤 ロン君の音声簡易文字起こし",
      url: "https://ron-voise-app.vercel.app",
      desc: "会議の議事録やメモに大活躍するリアルタイム文字起こしツール！",
    },
    {
      title: "💰 ロン君の消費税計算サイト",
      url: "https://zeikin-calc.vercel.app/",
      desc: "金額を入力すると消費税を自動計算！",
    },
    {
      title: "🎵 能登衆音楽コレクション（Vercel版）",
      url: "https://noto-musice-collection.vercel.app/",
      desc: "能登衆の音楽をまとめたコレクションサイト。",
    },
    {
      title: "🐾 ロン君大好き！！",
      url: "https://ron-makino.vercel.app/",
      desc: "ロン君への愛情がたっぷり詰まった特設サイト！",
    }
  ];

  const workersLinks = [
    {
      title: "🐛 ロン君のゴキ退 Ver2",
      url: "https://rongokiv2.ronron201907.workers.dev/",
      desc: "Cloudflare Workersで動くロン君のゴキ退治 Ver2。",
    },
  ];

  const renderLinks = [
    {
      title: "🔮 ロン君の運勢占い（Render版）",
      url: "https://my-js-page.onrender.com/",
      desc: "Renderでビルドした占いサイト。",
    },
    {
      title: "💰 ロン君の消費税計算サイト（Render版）",
      url: "https://zeikin-calc.onrender.com/",
      desc: "Renderでビルドした消費税計算サイト。",
    },
  ];

  const figmaLinks = [
    {
      title: "🎵 能登衆音楽コレクション（Figma）",
      url: "https://beatle-noto-ogi.figma.site/",
      desc: "Figmaで作成した音楽コレクションサイト。",
    },
    {
      title: "💰 ロン君消費税計算サイト（Figma）",
      url: "https://mace-walk-72354966.figma.site/",
      desc: "Figmaで作成した消費税計算サイト。",
    }
  ];

  const themeColor = "#fca311";
  const darkColor = "#14213d";

  // 🌟 スライドアニメーションCSS
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes slideIn {
        0% { transform: translateX(-100%); opacity: 0; }
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            ロン君の部屋
          </span>
        </div>

        <div
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          AI検証ハブサイト
        </div>

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
            left: 0,
            width: "80%",
            height: "80vh",
            overflowY: "auto",
            padding: "20px",
            zIndex: 999,
            borderTop: `2px solid ${themeColor}`,
          }}
        >
          <p style={{ color: themeColor, fontWeight: "bold" }}>
            🐾 ロン君の特設リンクメニュー
          </p>

          <a
            href="/memo.html"
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
            📘 React学習サイト
          </a>

          {/* Vercel一覧 */}
          <h4 style={{ color: "#fff", marginTop: "20px" }}>🚀 Vercel</h4>
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
          <h4 style={{ color: "#fff", marginTop: "20px" }}>☁️ Cloudflare Workers</h4>
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
          <h4 style={{ color: "#fff", marginTop: "20px" }}>⚙ Render</h4>
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
          <h4 style={{ color: "#fff", marginTop: "20px" }}>🎨 Figma</h4>
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
            alt="黒猫ロン君"
            style={{
              width: "130px",
              height: "130px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />

          <h2 style={{ marginBottom: "10px", fontSize: "26px" }}>
            ロン君 (Ron)
          </h2>
          <p style={{ marginBottom: "15px", color: "#666" }}>
            🐈‍⬛ 黒猫の男の子（オス） / 🎂 7歳
          </p>
          <p style={{ lineHeight: "1.6", color: darkColor }}>
            こんにちは！ボクは黒猫のロン。  
            このサイトは、AI開発の検証を目的に作られているよ🐾
          </p>
        </div>

        {/* 📘 React学習リンク */}
        <section
          style={{
            background: "linear-gradient(135deg, #fff7ed, #eff6ff)",
            border: `2px solid ${themeColor}`,
            borderRadius: "16px",
            padding: "22px 20px",
            marginBottom: "35px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "24px" }}>📘</span>
            <h3 style={{ margin: 0, fontSize: "20px", color: darkColor }}>
              React学習用ページへ移動
            </h3>
          </div>
          <p style={{ marginBottom: "12px", color: "#4b5563", lineHeight: 1.6 }}>
            Reactの学習内容をまとめたページです。ここからすぐに開けるので、学習の入口として使いやすいです。
          </p>
          <a
            href="/memo.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: themeColor,
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            React学習サイトを開く ➔
          </a>
        </section>

        {/* 🧪 説明セクション */}
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
            🧪 ロン君の部屋の説明
          </h3>

          <p>
            <strong>目的：</strong>
            AI開発の検証を行うためのハブサイトです。  
            全て無料で作成・運用し、1つのサイトは約3時間で完成させています。
          </p>

          <div className="env-badges" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", minWidth: "90px", color: "#333" }}>検証環境：</span>
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

          <p style={{ marginTop: "18px" }}>
            ※ LLM は低レベルのものでOK。  
            RAG（外部知識参照）で補完する方針です。
          </p>

          <p>
            <strong>Figma：</strong>
            Figmaで作成したデザインを React / Next.js / Vercel に移植する検証も行っています。
          </p>

          <p style={{ marginTop: "10px", color: "#777" }}>
            ※ このサイト群はすべてAIで作成されています。
          </p>
        </section>

        {/* 🔗 Vercelリンク（カード） */}
        <h3 style={{ marginBottom: "15px" }}>🚀 Vercelで作成したサイト</h3>
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
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Vercelでビルドされています
            </p>
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
              サイトを開く ➔
            </a>
          </div>
        ))}

        {/* 🔗 Cloudflare Workersリンク（カード） */}
        <h3 style={{ margin: "30px 0 15px 0" }}>☁️ Cloudflare Workersで作成したサイト</h3>
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
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Cloudflare Workersで動作しています
            </p>
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
              サイトを開く ➔
            </a>
          </div>
        ))}

        {/* 🔗 Renderリンク（カード） */}
        <h3 style={{ margin: "30px 0 15px 0" }}>⚙ Renderで作成したサイト</h3>
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
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Renderでビルドされています
            </p>
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
              サイトを開く ➔
            </a>
          </div>
        ))}

        {/* 🔗 Figmaリンク（カード） */}
        <h3 style={{ margin: "30px 0 15px 0" }}>🎨 Figmaで作成したサイト</h3>
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
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Figmaで作成されています
            </p>
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
              サイトを開く ➔
            </a>
          </div>
        ))}
      </main>

      {/* フッター */}
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
          最終確認: {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}
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
          <p style={{ margin: "0 0 6px", fontWeight: 700 }}>更新履歴</p>
          <ul style={{ margin: 0, paddingLeft: "18px", color: "#555" }}>
            <li style={{ marginBottom: "4px" }}>
              2026/08/11: 「更新履歴」表示を追加しました。
            </li>
            <li style={{ marginBottom: "4px" }}>
              2026/08/11: Cursor / Figma を検証環境リンクに追加しました。
            </li>
            <li style={{ marginBottom: "4px" }}>
              2026/08/11: 検証環境リンクをモバイルでも見やすいバッジ表示に変更しました。
            </li>
          </ul>
        </div>
        <p style={{ fontSize: "12px", color: "#aaa", margin: "14px 0 0 0" }}>
          ※ このサイトはAIで自動生成されています
        </p>
      </footer>

      {/* スマホ用CSS：のハンバーガーだけ制御 */}
      <style>{`
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