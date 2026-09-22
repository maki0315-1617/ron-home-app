import { DEMO_ENTRY_URL } from "../siteConfig.js";

const LINK_URLS = {
  vercel: [
    "https://my-js-page.vercel.app",
    "https://my-react-app-topaz-iota.vercel.app/",
    "https://my-ron-game1-app.vercel.app/",
    "https://ronron-app.vercel.app/",
    DEMO_ENTRY_URL,
    "https://ron-voise-app.vercel.app",
    "https://zeikin-calc.vercel.app/",
    "https://noto-musice-collection.vercel.app/",
    "https://ron-makino.vercel.app/",
  ],
  workers: ["https://rongokiv2.ronron201907.workers.dev/"],
  render: ["https://my-js-page.onrender.com/", "https://zeikin-calc.onrender.com/"],
  figma: ["https://beatle-noto-ogi.figma.site/", "https://mace-walk-72354966.figma.site/"],
};

const content = {
  ja: {
    siteTitle: "ロンAIシステムズAI検証HUB",
    siteSubtitle: "AI検証ハブサイト",
    menuTitle: "🐾 ロンAIシステムズAI検証HUB リンクメニュー",
    homeLink: "🏠 ロンスケ＋ジュール 公式トップ",
    profileAlt: "黒猫ロン君",
    profileName: "ロン君 (Ron)",
    profileMeta: "🐈‍⬛ 黒猫の男の子（オス） / 🎂 7歳",
    profileBio:
      "こんにちは！ボクは黒猫のロン。このHUBは、AI開発の検証を目的に作られているよ🐾",
    sharedTitle: "共有ページ一覧",
    openBtn: "開く ➔",
    aboutTitle: "🧪 ロンAIシステムズAI検証HUBの説明",
    purposeLabel: "目的：",
    purposeText:
      "AI開発の検証を行うためのハブサイトです。全て無料で作成・運用し、1つのサイトは約3時間で完成させています。",
    envLabel: "検証環境：",
    llmNote:
      "※ LLM は低レベルのものでOK。RAG（外部知識参照）で補完する方針です。",
    figmaNote:
      "Figma：Figmaで作成したデザインを React / Next.js / Vercel に移植する検証も行っています。",
    aiNote: "※ このサイト群はすべてAIで作成されています。",
    sectionVercel: "🚀 Vercelで作成したサイト",
    sectionWorkers: "☁️ Cloudflare Workersで作成したサイト",
    sectionRender: "⚙ Renderで作成したサイト",
    sectionFigma: "🎨 Figmaで作成したサイト",
    noteVercel: "※ Vercelでビルドされています",
    noteWorkers: "※ Cloudflare Workersで動作しています",
    noteRender: "※ Renderでビルドされています",
    noteFigma: "※ Figmaで作成されています",
    openSite: "サイトを開く ➔",
    footerHistory: "更新履歴",
    footerAi: "※ このサイトはAIで自動生成されています",
    lastChecked: "最終確認",
    history: [
      "2026/08/13: 共有ページ一覧を追加し、report.html への導線を分かりやすくしました。",
      "2026/08/11: 「更新履歴」表示を追加しました。",
      "2026/08/11: Cursor / Figma を検証環境リンクに追加しました。",
      "2026/08/11: 検証環境リンクをモバイルでも見やすいバッジ表示に変更しました。",
    ],
    sharedLinks: [
      {
        title: "📊 セキュリティ診断レポート",
        url: "/report.html",
        description: "OWASP ZAP で確認した脆弱性の概要と結果をわかりやすくまとめた共有ページです。",
        badge: "共有ページ",
      },
      {
        title: "📘 React学習サイト",
        url: "/memo.html",
        description: "学習メモや検証内容を整理しているページ。今後も他の資料をここに追加しやすい構成です。",
        badge: "資料集",
      },
    ],
    vercelLinks: [
      { title: "🔮 ロン君の運勢占い", desc: "今日のロン君からのメッセージと運勢を占おう！" },
      { title: "🎮 黒猫ロン君クリックゲーム", desc: "画面のロン君をたくさんクリックして遊ぶ楽しいゲーム！" },
      { title: "🪳 ロン君のゴキ退治", desc: "すばやい動きのゴキブリをロン君が退治するアクションゲーム！" },
      { title: "📅 ロン君お世話カレンダー", desc: "ロン君の毎日のお世話や体調を優しく管理できるカレンダー！" },
      { title: "📅 ロンスケ＋ジュール（デモ入口）", desc: "ロンAIシステムズのデモ入口ページ（?demo=1）" },
      { title: "🎤 ロン君の音声簡易文字起こし", desc: "会議の議事録やメモに大活躍するリアルタイム文字起こしツール！" },
      { title: "💰 ロン君の消費税計算サイト", desc: "金額を入力すると消費税を自動計算！" },
      { title: "🎵 能登衆音楽コレクション（Vercel版）", desc: "能登衆の音楽をまとめたコレクションサイト。" },
      { title: "🐾 ロン君大好き！！", desc: "ロン君への愛情がたっぷり詰まった特設サイト！" },
    ],
    workersLinks: [
      { title: "🐛 ロン君のゴキ退 Ver2", desc: "Cloudflare Workersで動くロン君のゴキ退治 Ver2。" },
    ],
    renderLinks: [
      { title: "🔮 ロン君の運勢占い（Render版）", desc: "Renderでビルドした占いサイト。" },
      { title: "💰 ロン君の消費税計算サイト（Render版）", desc: "Renderでビルドした消費税計算サイト。" },
    ],
    figmaLinks: [
      { title: "🎵 能登衆音楽コレクション（Figma）", desc: "Figmaで作成した音楽コレクションサイト。" },
      { title: "💰 ロン君消費税計算サイト（Figma）", desc: "Figmaで作成した消費税計算サイト。" },
    ],
    sectionLabels: { vercel: "🚀 Vercel", workers: "☁️ Cloudflare Workers", render: "⚙ Render", figma: "🎨 Figma" },
  },
  en: {
    siteTitle: "Ron AI Systems AI Verification HUB",
    siteSubtitle: "AI verification hub",
    menuTitle: "🐾 Ron AI Systems AI Verification HUB — Links",
    homeLink: "🏠 Ron Schedule+ Official Home",
    profileAlt: "Black cat Ron",
    profileName: "Ron the Cat",
    profileMeta: "🐈‍⬛ Male black cat / 🎂 7 years old",
    profileBio:
      "Hi! I'm Ron, a black cat. This HUB is built for AI development experiments 🐾",
    sharedTitle: "Shared pages",
    openBtn: "Open ➔",
    aboutTitle: "🧪 About Ron AI Systems AI Verification HUB",
    purposeLabel: "Purpose:",
    purposeText:
      "A hub for AI development experiments. All sites are built and run for free; each site takes about 3 hours to complete.",
    envLabel: "Stack:",
    llmNote: "※ Low-tier LLMs are fine; we complement with RAG (external knowledge).",
    figmaNote:
      "Figma: We also test porting Figma designs to React / Next.js / Vercel.",
    aiNote: "※ These sites were created with AI assistance.",
    sectionVercel: "🚀 Sites on Vercel",
    sectionWorkers: "☁️ Sites on Cloudflare Workers",
    sectionRender: "⚙ Sites on Render",
    sectionFigma: "🎨 Sites on Figma",
    noteVercel: "Built on Vercel",
    noteWorkers: "Runs on Cloudflare Workers",
    noteRender: "Built on Render",
    noteFigma: "Created in Figma",
    openSite: "Open site ➔",
    footerHistory: "Changelog",
    footerAi: "※ This site was auto-generated with AI",
    lastChecked: "Last checked",
    history: [
      "2026/08/13: Added shared pages section and clearer link to report.html.",
      "2026/08/11: Added changelog display.",
      "2026/08/11: Added Cursor / Figma to stack badges.",
      "2026/08/11: Improved mobile layout for stack badges.",
    ],
    sharedLinks: [
      {
        title: "📊 Security assessment report",
        url: "/report.html",
        description: "Summary of OWASP ZAP findings in plain language.",
        badge: "Shared",
      },
      {
        title: "📘 React learning notes",
        url: "/memo.html",
        description: "Study notes and experiments; easy to extend with more docs.",
        badge: "Docs",
      },
    ],
    vercelLinks: [
      { title: "🔮 Ron's fortune telling", desc: "Today's message and fortune from Ron!" },
      { title: "🎮 Black cat Ron clicker", desc: "Click Ron on screen — a fun mini game!" },
      { title: "🪳 Ron's roach patrol", desc: "Action game: Ron catches speedy roaches!" },
      { title: "📅 Ron care calendar", desc: "Gently track Ron's daily care and health." },
      { title: "📅 Ron Schedule+ (demo entry)", desc: "Ron AI Systems demo entry page (?demo=1)." },
      { title: "🎤 Ron voice transcription", desc: "Real-time transcription for meetings and memos." },
      { title: "💰 Ron tax calculator", desc: "Enter amounts to calculate consumption tax." },
      { title: "🎵 Noto music collection (Vercel)", desc: "Collection of Noto community music." },
      { title: "🐾 We love Ron!!", desc: "A fan site full of love for Ron!" },
    ],
    workersLinks: [
      { title: "🐛 Ron's roach patrol Ver2", desc: "Roach patrol v2 on Cloudflare Workers." },
    ],
    renderLinks: [
      { title: "🔮 Ron's fortune (Render)", desc: "Fortune site built on Render." },
      { title: "💰 Tax calculator (Render)", desc: "Tax calculator built on Render." },
    ],
    figmaLinks: [
      { title: "🎵 Noto music collection (Figma)", desc: "Music collection site made in Figma." },
      { title: "💰 Tax calculator (Figma)", desc: "Tax calculator prototype in Figma." },
    ],
    sectionLabels: { vercel: "🚀 Vercel", workers: "☁️ Cloudflare Workers", render: "⚙ Render", figma: "🎨 Figma" },
  },
};

function attachUrls(items, urls) {
  return items.map((item, i) => ({ ...item, url: urls[i] }));
}

export function getHubContent(locale) {
  const lang = locale === "en" ? "en" : "ja";
  const c = content[lang];
  return {
    ...c,
    vercelLinks: attachUrls(c.vercelLinks, LINK_URLS.vercel),
    workersLinks: attachUrls(c.workersLinks, LINK_URLS.workers),
    renderLinks: attachUrls(c.renderLinks, LINK_URLS.render),
    figmaLinks: attachUrls(c.figmaLinks, LINK_URLS.figma),
  };
}
