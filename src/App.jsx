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
      title: "🧪 AI検証サイト（総合）",
      url: "https://your-ai-lab.vercel.app/",
      desc: "AI検証用の総合サイト（例示）",
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
  ];

  const themeColor = "#fca311";
  const darkColor = "#14213d";

  // アニメーションCSS
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes popIn {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
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
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
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

        <nav className="pc-nav" style={{ display: "flex", gap: "20px" }}>
          <span style={{ fontSize: "14px", opacity: 0.8 }}>
            AI検証ハブサイト
          </span>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-button"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "28px",
          }}
        >
          {isMenuOpen ? "🐾" : "☰"}
        </button>
      </header>

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
            animation: "popIn 0.4s ease-out",
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

          <p>
            <strong>検証環境：</strong>
            React / Next.js / Vite / Vercel / Render / Supabase / MongoDB /
            GitHub / Local LLM / RAG / Cursor / VS Code
          </p>

          <p>
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

        {/* 🔗 Vercelリンク */}
        <h3 style={{ marginBottom: "15px" }}>🚀 Vercelで作成したサイト</h3>
        {vercelLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
            style={{
              display: "block",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              textDecoration: "none",
              color: darkColor,
              border: "2px solid #eee",
              transition: "0.3s",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Vercelでビルドされています
            </p>
          </a>
        ))}

        {/* 🔗 Renderリンク */}
        <h3 style={{ margin: "30px 0 15px 0" }}>⚙ Renderで作成したサイト</h3>
        {renderLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
            style={{
              display: "block",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              textDecoration: "none",
              color: darkColor,
              border: "2px solid #eee",
              transition: "0.3s",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Renderでビルドされています
            </p>
          </a>
        ))}

        {/* 🔗 Figmaリンク */}
        <h3 style={{ margin: "30px 0 15px 0" }}>🎨 Figmaで作成したサイト</h3>
        {figmaLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
            style={{
              display: "block",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              textDecoration: "none",
              color: darkColor,
              border: "2px solid #eee",
              transition: "0.3s",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>{link.title}</h4>
            <p style={{ marginBottom: "5px", color: "#666" }}>{link.desc}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              ※ Figmaで作成されています
            </p>
          </a>
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
      </footer>

      {/* スマホ用CSS */}
      <style>{`
        @media (max-width: 600px) {
          .pc-nav { display: none !important; }
          .menu-button { display: block !important; }
        }
      `}</style>
    </div>
  );
}
