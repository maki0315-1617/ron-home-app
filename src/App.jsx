import React, { useState, useEffect } from 'react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div style={styles.body}>
      {/* ヘッダー */}
      <header style={styles.header}>
        <div style={styles.headerLogo}>
          <img src="ron-logo.png" alt="Ron Logo" style={styles.logoImg} />
          <span>ロン君の部屋</span>
        </div>
        <div style={styles.headerSubtitle}>AI検証ハブサイト</div>
        <button style={styles.menuBtn} onClick={toggleMenu} aria-label="メニューを開く">☰</button>
      </header>

      {/* はんばーがーめにゅー */}
      <nav style={{ ...styles.navMenu, right: menuOpen ? '0' : '-100%' }}>
        <ul style={styles.navList}>
          <li><a href="#about" onClick={closeMenu} style={styles.navLink}>ロン君について</a></li>
          <li><a href="#shared-pages" onClick={closeMenu} style={styles.navLink}>共有ページ一覧</a></li>
          <li><a href="#about-room" onClick={closeMenu} style={styles.navLink}>ロン君の部屋の説明</a></li>
          <li><a href="#vercel-sites" onClick={closeMenu} style={styles.navLink}>Vercelで作成したサイト</a></li>
          <li><a href="#cloudflare-sites" onClick={closeMenu} style={styles.navLink}>Cloudflare Workersで作成したサイト</a></li>
          <li><a href="#render-sites" onClick={closeMenu} style={styles.navLink}>Renderで作成したサイト</a></li>
          <li><a href="#figma-sites" onClick={closeMenu} style={styles.navLink}>Figmaで作成したサイト</a></li>
        </ul>
      </nav>

      <main style={styles.container}>
        {/* ロン君紹介セクション */}
        <section style={styles.hero} id="about">
          <div style={styles.heroImage}>
            <img src="ron.png" alt="黒猫ロン君" style={styles.ronImg} />
          </div>
          <div style={styles.heroContent}>
            <h2>ロン君 (Ron)</h2>
            <p style={styles.profileBadge}>🐈‍⬛ 黒猫の男の子（オス） / 🎂 7歳</p>
            <p>こんにちは！ボクは黒猫のロン。 このサイトは、AI開発の検証を目的に作られているよ🐾</p>
          </div>
        </section>

        {/* 共有ページ一覧 */}
        <section style={styles.section} id="shared-pages">
          <h2>🔗 共有ページ一覧</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <h3>📊 セキュリティ診断レポート</h3>
              <p>OWASP ZAP で確認した脆弱性の概要と結果をわかりやすくまとめた共有ページです。</p>
              <a href="https://ron-home-app.vercel.app/report.html" style={styles.btn}>開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>📘 React学習サイト</h3>
              <p>学習メモや検証内容を整理しているページ。今後も他の資料をここに追加しやすい構成です。</p>
              <a href="https://ron-home-app.vercel.app/memo.html" style={styles.btn}>開く ➔</a>
            </div>
          </div>
        </section>

        {/* ロン君の部屋の説明 */}
        <section style={styles.section} id="about-room">
          <h2>🧪 ロン君の部屋の説明</h2>
          <div style={styles.card}>
            <p><strong>目的：</strong> AI開発の検証を行うためのハブサイトです。 全て無料で作成・運用し、1つのサイトは約3時間で完成させています。</p>
            <p><strong>検証環境：</strong> 
              <a href="https://ron-home-app.vercel.app/url?id=2" style={styles.envLink}>React</a>{' '}
              <a href="https://nextjs.org/" style={styles.envLink}>Next.js</a>{' '}
              <a href="https://ron-home-app.vercel.app/url?id=4" style={styles.envLink}>Vite</a>{' '}
              <a href="https://ron-home-app.vercel.app/url?id=5" style={styles.envLink}>Vercel</a>{' '}
              <a href="https://ron-home-app.vercel.app/url?id=6" style={styles.envLink}>Cloudflare Workers</a>{' '}
              <a href="url?id=14" style={styles.envLink}>Render</a>{' '}
              <a href="url?id=15" style={styles.envLink}>Supabase</a>{' '}
              <a href="url?id=16" style={styles.envLink}>Firebase</a>{' '}
              <a href="url?id=17" style={styles.envLink}>MongoDB</a>{' '}
              <a href="url?id=18" style={styles.envLink}>GitHub</a>{' '}
              <a href="url?id=19" style={styles.envLink}>Cursor</a>{' '}
              <a href="url?id=20" style={styles.envLink}>Figma</a>{' '}
              <a href="url?id=21" style={styles.envLink}>VS Code</a>
            </p>
            <p style={styles.note}>※ LLM は低レベルのものでOK。 RAG（外部知識参照）で補完する方針です。</p>
            <p><strong>Figma：</strong> Figmaで作成したデザインを React / Next.js / Vercel に移植する検証も行っています。</p>
            <p style={styles.note}>※ このサイト群はすべてAIで作成されています。</p>
          </div>
        </section>

        {/* Vercelで作成したサイト */}
        <section style={styles.section} id="vercel-sites">
          <h2>🚀 Vercelで作成したサイト</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <h3>📅 ロン君の簡易スケジュール</h3>
              <p>ロン君の毎日のスケジュールを手軽にチェックできる便利なスケジュール表！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://ron-sch.vercel.app/" target="_blank" rel="noopener noreferrer" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>🔮 ロン君の運勢占い</h3>
              <p>今日のロン君からのメッセージと運勢を占おう！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="url?id=23" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>🎮 黒猫ロン君クリックゲーム</h3>
              <p>画面のロン君をたくさんクリックして遊ぶ楽しいゲーム！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://my-react-app-topaz-iota.vercel.app/" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>🪳 ロン君のゴキ退治</h3>
              <p>すばやい動きのゴキブリをロン君が退治するアクションゲーム！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://my-ron-game1-app.vercel.app/" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>📅 ロン君お世話カレンダー</h3>
              <p>ロン君の毎日のお世話や体調を優しく管理できるカレンダー！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://ronron-app.vercel.app/" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>🎤 ロン君の音声簡易文字起こし</h3>
              <p>会議の議事録やメモに大活躍するリアルタイム文字起こしツール！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://ron-voise-app.vercel.app/" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>💰 ロン君の消費税計算サイト</h3>
              <p>金額を入力すると消費税を自動計算！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://zeikin-calc.vercel.app/" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>🎵 能登衆音楽コレクション（Vercel版）</h3>
              <p>能登衆の音楽をまとめたコレクションサイト。</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="url?id=29" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>🐾 ロン君大好き！！</h3>
              <p>ロン君への愛情がたっぷり詰まった特設サイト！</p>
              <span style={styles.note}>※ Vercelでビルドされています</span>
              <a href="https://ron-makino.vercel.app/" style={styles.btn}>サイトを開く ➔</a>
            </div>
          </div>
        </section>
        {/* Cloudflare Workersで作成したサイト */}
        <section style={styles.section} id="cloudflare-sites">
          <h2>☁️ Cloudflare Workersで作成したサイト</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <h3>🐛 ロン君のゴキ退 Ver2</h3>
              <p>Cloudflare Workersで動くロン君のゴキ退治 Ver2。</p>
              <span style={styles.note}>※ Cloudflare Workersで動作しています</span>
              <a href="https://rongokiv2.ronron201907.workers.dev/" style={styles.btn}>サイトを開く ➔</a>
            </div>
          </div>
        </section>

        {/* Renderで作成したサイト */}
        <section style={styles.section} id="render-sites">
          <h2>⚙ Renderで作成したサイト</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <h3>🔮 ロン君の運勢占い（Render版）</h3>
              <p>Renderでビルドした占いサイト。</p>
              <span style={styles.note}>※ Renderでビルドされています</span>
              <a href="https://my-js-page.onrender.com/" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>💰 ロン君の消費税計算サイト（Render版）</h3>
              <p>Renderでビルドした消費税計算サイト。</p>
              <span style={styles.note}>※ Renderでビルドされています</span>
              <a href="https://react.dev/5" style={styles.btn}>サイトを開く ➔</a>
            </div>
          </div>
        </section>

        {/* Figmaで作成したサイト */}
        <section style={styles.section} id="figma-sites">
          <h2>🎨 Figmaで作成したサイト</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <h3>🎵 能登衆音楽コレクション（Figma）</h3>
              <p>Figmaで作成した音楽コレクションサイト。</p>
              <span style={styles.note}>※ Figmaで作成されています</span>
              <a href="url?id=34" style={styles.btn}>サイトを開く ➔</a>
            </div>
            <div style={styles.card}>
              <h3>💰 ロン君消費税計算サイト（Figma）</h3>
              <p>Figmaで作成した消費税計算サイト。</p>
              <span style={styles.note}>※ Figmaで作成されています</span>
              <a href="https://mace-walk-72354966.figma.site/" style={styles.btn}>サイトを開く ➔</a>
            </div>
          </div>
        </section>

        {/* 更新履歴セクション */}
        <section style={styles.section}>
          <h2>更新履歴</h2>
          <div style={styles.card}>
            <ul style={styles.historyList}>
              <li>2026/08/13: 共有ページ一覧を追加し、report.html への導線を分かりやすくしました。</li>
              <li>2026/08/11: 「更新履歴」表示を追加しました。</li>
              <li>2026/08/11: Cursor / Figma を検証環境リンクに追加しました。</li>
              <li>2026/08/11: 検証環境リンクをモバイルでも見やすいバッジ表示に変更しました。</li>
            </ul>
            <p style={styles.note}>※ このサイトはAIで自動生成されています</p>
          </div>
        </section>
      </main>

      {/* トップに戻る矢印ボタン */}
      <a 
        href="#" 
        style={{ 
          ...styles.backToTop, 
          opacity: showBackToTop ? 1 : 0, 
          visibility: showBackToTop ? 'visible' : 'hidden' 
        }} 
        aria-label="トップに戻る"
      >
        ⬆
      </a>

      <footer style={styles.footer}>
        <p>&copy; 2026 ron. All rights reserved. 最終確認: 2026/08/16</p>
      </footer>
    </div>
  );
}

// スタイル定義
const styles = {
  body: {
    fontFamily: 'sans-serif',
    margin: 0,
    backgroundColor: '#f3f0ff',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2e2640',
    color: '#fff',
    padding: '1rem',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  headerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
  },
  logoImg: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
  },
  headerSubtitle: {
    fontSize: '0.9rem',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  navMenu: {
    position: 'fixed',
    top: '60px',
    width: '250px',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#ffffff',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
    transition: 'right 0.3s ease',
    zIndex: 999,
    overflowY: 'auto',
  },
  navList: {
    listStyle: 'none',
    padding: '1rem',
    margin: 0,
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    display: 'block',
    padding: '0.5rem',
    borderRadius: '4px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
  },
  hero: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  ronImg: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  profileBadge: {
    fontWeight: 'bold',
    color: '#555',
  },
  section: {
    marginBottom: '2rem',
  },
  cardGrid: {
    display: 'grid',
    gap: '1rem',
  },
  card: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  note: {
    fontSize: '0.8rem',
    color: '#666',
    display: 'block',
    marginBottom: '0.5rem',
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#6c5ce7',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  envLink: {
    display: 'inline-block',
    backgroundColor: '#e2d9fc',
    color: '#4a3b8c',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    margin: '2px',
  },
  historyList: {
    paddingLeft: '1.2rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  footer: {
    textAlign: 'center',
    padding: '1.5rem',
    color: '#666',
    fontSize: '0.9rem',
  },
  backToTop: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#6c5ce7',
    color: '#fff',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '1.2rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'opacity 0.3s, visibility 0.3s',
    zIndex: 1000,
  },
};