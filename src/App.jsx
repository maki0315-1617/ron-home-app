import { useState, useEffect } from 'react';

export default function App() {
  // 🌟【データエリア】
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ハンバーガーメニューの開閉状態

  // ロン君の関連サイトのリンクデータ
  const links = [
    { title: "🔮 ロン君の運勢占い", url: "https://my-js-page.vercel.app", desc: "今日のロン君からのメッセージと運勢を占おう！" },
    { title: "🎮 黒猫ロン君クリックゲーム", url: "https://my-react-app-topaz-iota.vercel.app/", desc: "画面のロン君をたくさんクリックして遊ぶ楽しいゲーム！" },
    { title: "🪳 ロン君のゴキ退治", url: "https://my-ron-game1-app.vercel.app/", desc: "すばやい動きのゴキブリをロン君が退治するアクションゲーム！" },
    { title: "📅 ロン君お世話カレンダー", url: "https://ronron-app.vercel.app/", desc: "ロン君の毎日のお世話や体調を優しく管理できるカレンダー！" },
    { title: "🎤 ロン君の音声簡易文字起こし", url: "https://ron-voise-app.vercel.app", desc: "会議の議事録やメモに大活躍するリアルタイム文字起こしツール！" }
  ];

  // リンクをクリックしたときにメニューを自動で閉じるルール
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // ⚡【デザイン・スタイル設定】
  const themeColor = "#fca311"; // 可愛い黒猫を引き立てるおしゃれなオレンジイエロー
  const darkColor = "#14213d";  // 黒猫の毛並みをイメージした大人っぽいネイビーブラック

  // アニメーション用のキーフレーム（擬似的にインラインで管理）
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
      /* スクロールバーも可愛く */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #fdf0d5; }
      ::-webkit-scrollbar-thumb { background: ${themeColor}; border-radius: 4px; }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);
  // 🎨【見た目エリア】：HTMLの組み立て
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdf0d5', color: darkColor, fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif', margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      
      {/* 🧭 ヘッダーエリア */}
      <header style={{ backgroundColor: darkColor, color: '#fff', padding: '15px 20px', position: 'sticky', top: 0, zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <img src="/ron.png" alt="Ron Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '50%', backgroundColor: '#fff', padding: '2px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px' }}>ロン君の部屋</span>
        </div>

        {/* 💻 PC用ナビゲーション（画面が広い時に表示） */}
        <nav style={{ display: 'flex', gap: '20px' }} className="pc-nav">
          {links.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', transition: 'color 0.2s' }}>
              サイト{idx + 1}
            </a>
          ))}
        </nav>

        {/* 🍔 スマホ用ハンバーガーボタン（三本線） */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', outline: 'none', padding: '5px' }}
          className="menu-button"
        >
          {isMenuOpen ? "🐾" : "☰"}
        </button>
      </header>

      {/* 📱 スマホ用開閉メニュー */}
      {isMenuOpen && (
        <div style={{ backgroundColor: darkColor, position: 'fixed', top: '70px', left: 0, width: '100%', padding: '20px', boxSizing: 'border-box', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '15px', borderTop: `2px solid ${themeColor}`, boxShadow: '0 10px 20px rgba(0,0,0,0.15)', animation: 'popIn 0.3s ease-out' }}>
          <p style={{ color: themeColor, margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold' }}>🐾 ロン君の特設リンクメニュー</p>
          {links.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontWeight: 'bold' }}>
              {link.title}
            </a>
          ))}
        </div>
      )}

      {/* 🏡 メインコンテンツ */}
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* 🐈 ロン君のプロフィールカード */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px 20px', textAlign: 'center', boxShadow: '0 6px 15px rgba(0,0,0,0.05)', marginBottom: '40px', animation: 'popIn 0.4s ease-out', position: 'relative', border: '2px solid #eee' }}>
          <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: themeColor, color: '#fff', padding: '4px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            PROFILE
          </div>
          
          <img src="/ron.png" alt="黒猫のロン君" style={{ width: '130px', height: '130px', objectFit: 'contain', margin: '10px auto 20px auto', display: 'block', filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.1))' }} />
          
          <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', fontWeight: 'bold' }}>ロン君 (Ron)</h2>
          <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '15px', fontWeight: 'bold' }}>
            🐈‍⬛ 黒猫の男の子（オス） / 🎂 7歳
          </p>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: darkColor, maxWidth: '500px', margin: '0 auto' }}>
            こんにちは！ボクは黒猫のロン。今年でピカピカの7歳になったよ🐾<br />
            ツヤツヤの黒い毛並みが自慢なんだ。ボクの特製アプリでいっぱい遊んでいってね！
          </p>
        </div>

        {/* 🔗 リンクボタン一覧 */}
        <h3 style={{ fontSize: '20px', margin: '0 0 20px 0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          🐾 ロン君のあぷり・さいと一覧 🐾
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '2px solid #eee', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ textLeft: 'left' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: darkColor, fontWeight: 'bold' }}>{link.title}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.4' }}>{link.desc}</p>
                </div>
                <span style={{ backgroundColor: themeColor, color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
                  サイトを開く ➔
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* 📝 コピーライトフッター */}
      <footer style={{ textAlign: 'center', padding: '25px 0', fontSize: '13px', color: '#888', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#fff', marginTop: '40px' }}>
        <p>&copy; {new Date().getFullYear()} ron. All rights reserved.</p>
      </footer>

      {/* 📱 レスポンシブ表示をコントロールするCSS（PCとスマホの切り替え） */}
      <style>{`
        @media (max-width: 600px) {
          .pc-nav { display: none !important; }
          .menu-button { display: block !important; }
        }
      `}</style>

    </div>
  );
}
