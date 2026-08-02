import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessCount, setAccessCount] = useState(0);

  // 🌟 Supabase アクセスカウンター
  useEffect(() => {
    async function updateCounter() {
      const { data } = await supabase
        .from("access_counter")
        .select("count")
        .eq("id", 1)
        .single();

      let newCount = 0;

      if (!data) {
        await supabase.from("access_counter").insert({ id: 1, count: 1 });
        newCount = 1;
      } else {
        newCount = data.count + 1;
        await supabase
          .from("access_counter")
          .update({ count: newCount })
          .eq("id", 1);
      }

      setAccessCount(newCount);
    }

    updateCounter();
  }, []);

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
    }
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

  // AI背景・AIカウンターCSS
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes popIn {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }

      .ai-bg {
        background-image:
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 40%),
          linear-gradient(135deg, #4b2aff, #00d4ff);
      }

      .ai-counter {
        font-family: 'Courier New', monospace;
        font-size: 28px;
        font-weight: bold;
        color: #00eaff;
        text-shadow: 0 0 8px #00eaff, 0 0 15px #00aaff;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <div className="ai-bg" style={{ minHeight: "100vh", color: darkColor }}>
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

        <div style={{ fontWeight: "bold", fontSize: "14px", opacity: 0.9 }}>
          AI検証ハブサイト
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      {/* 📱 スマホメニュー（一覧表＋スクロール） */}
      {isMenuOpen && (
        <div
          style={{
            backgroundColor: darkColor,
            position: "fixed",
            top: "70px",
            left: 0,
            width: "100%",
            height: "80vh",
            overflowY: "auto",
            padding: "20px",
            zIndex: 999,
            borderTop: `2px solid ${themeColor}`,
            animation: "popIn 0.3s ease-out",
          }}
        >
          <p style={{ color: themeColor, fontWeight: "bold" }}>
            🐾 ロン君の特設リンクメニュー
          </p>

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
        <p style={{ fontSize: "12px", color: "#aaa" }}>
          ※ このサイトはAIで自動生成されています
        </p>
      </footer>

      {/* スマホ用CSS：ハンバーガーだけ制御 */}
      <style>{`
        @media (max-width: 600px) {
          .menu-button { display: block; }
        }
      `}</style>
    </div>
  );
}
