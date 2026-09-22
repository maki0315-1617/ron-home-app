import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ron-site-locale";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "ja";
  });

  const setLocale = (next) => {
    const value = next === "en" ? "en" : "ja";
    setLocaleState(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  const toggleLocale = () => setLocale(locale === "ja" ? "en" : "ja");

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "ja";
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
