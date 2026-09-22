import { useLanguage } from "../i18n/LanguageContext.jsx";

const themeColor = "#fca311";

export default function LanguageToggle({ compact = false }) {
  const { locale, setLocale } = useLanguage();

  const btn = (lang, label) => (
    <button
      type="button"
      onClick={() => setLocale(lang)}
      aria-pressed={locale === lang}
      style={{
        padding: compact ? "5px 8px" : "6px 10px",
        borderRadius: "8px",
        border: locale === lang ? `2px solid ${themeColor}` : "1px solid rgba(255,255,255,0.35)",
        background: locale === lang ? "rgba(252,163,17,0.25)" : "transparent",
        color: "#fff",
        fontWeight: locale === lang ? 700 : 500,
        fontSize: compact ? "11px" : "12px",
        cursor: "pointer",
        lineHeight: 1.2,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      role="group"
      aria-label={locale === "ja" ? "言語切替" : "Language"}
      style={{ display: "flex", gap: "6px", flexShrink: 0 }}
    >
      {btn("ja", "日本語")}
      {btn("en", "EN")}
    </div>
  );
}
