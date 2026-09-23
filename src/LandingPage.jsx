import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./i18n/LanguageContext.jsx";
import {
  getLandingContent,
  resolveCompanyDisplay,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_LINK_URL,
} from "./i18n/landingContent.js";
import LanguageToggle from "./components/LanguageToggle.jsx";
import { SITE_URL, DEMO_APP_URL, STRIPE_STANDARD_CHECKOUT_URL } from "./siteConfig.js";

const themeColor = "#fca311";
const darkColor = "#14213d";

const demoLinkProps = {
  href: DEMO_APP_URL,
  target: "_blank",
  rel: "noopener noreferrer",
};

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

export default function LandingPage() {
  const { locale } = useLanguage();
  const L = useMemo(() => getLandingContent(locale), [locale]);
  const company = useMemo(
    () => resolveCompanyDisplay(L.company, SITE_URL, locale),
    [L.company, locale],
  );
  const ui = L.ui;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    category: L.form.defaultCategory,
    message: "",
    agree: false,
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setForm((prev) => ({ ...prev, category: L.form.defaultCategory }));
  }, [L.form.defaultCategory]);

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
      setFormError(L.form.errors.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormError(L.form.errors.email);
      return;
    }
    if (!form.agree) {
      setFormError(L.form.errors.agree);
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
        throw new Error(data.error || L.form.errors.send);
      }
      setFormStatus("sent");
    } catch (err) {
      setFormStatus("idle");
      setFormError(err.message || L.form.errors.send);
    }
  };

  const privacySections = useMemo(() => {
    return L.privacySections.map((section, index) => {
      if (index === 4) {
        return { ...section, paragraphs: [L.privacyContact(company.email)] };
      }
      return section;
    });
  }, [L, company.email]);

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
            {company.product}
            <span style={{ display: "block", fontSize: "10px", opacity: 0.85, fontWeight: 500 }}>
              {locale === "ja" ? `${company.name} / ${company.nameEn}` : company.nameEn}
            </span>
          </span>
        </button>

        <a
          {...demoLinkProps}
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
          {ui.tryDemo}
        </a>

        <LanguageToggle compact />

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? ui.menuClose : ui.menuOpen}
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
            aria-label={ui.menuClose}
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
            aria-label={ui.siteNav}
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
              {ui.siteNav}
            </p>
            {L.nav.map((item) => (
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
            <p
              style={{
                color: themeColor,
                fontWeight: "bold",
                margin: "18px 0 10px",
                fontSize: "14px",
              }}
            >
              {ui.relatedPages}
            </p>
            {L.resources.map((item) =>
              item.internal ? (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: "block",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "11px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "15px",
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: "block",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "11px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "15px",
                  }}
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              {...demoLinkProps}
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
              {ui.openDemoApp}
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
            alt={ui.mascotAlt}
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
            {locale === "ja"
              ? `${company.name}（${company.nameEn}）${ui.providedBy}`
              : `${ui.providedBy} ${company.name}`}
          </p>
          <h1 style={{ margin: "0 0 8px", fontSize: "clamp(26px, 5vw, 34px)", lineHeight: 1.35 }}>
            {company.product}
          </h1>
          {locale === "ja" && (
            <p style={{ margin: "0 0 12px", fontSize: "15px", color: "#666", fontWeight: 600 }}>
              {company.productEn}
            </p>
          )}
          <p style={{ margin: "0 auto 22px", maxWidth: "560px", lineHeight: 1.75, color: "#555" }}>
            {ui.heroLead}
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
              {ui.contactCta}
            </button>
            <a
              {...demoLinkProps}
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
              {ui.freeDemo}
            </a>
          </div>
          <p style={{ marginTop: "18px", fontSize: "12px", color: "#888" }}>
            {ui.officialSite}{" "}
            <a href={SITE_URL} style={{ color: darkColor }}>
              {SITE_URL}
            </a>
          </p>
        </section>

        <SectionCard id="features" title={ui.featuresTitle} icon="✨">
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.85, color: "#444" }}>
            {ui.features.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          id="demo"
          title={ui.demoTitle}
          icon="📅"
          style={{ background: "linear-gradient(135deg, #fff7ed, #eff6ff)" }}
        >
          <p style={{ lineHeight: 1.75, color: "#444", marginTop: 0 }}>
            {ui.demoLead}
          </p>
          <div
            style={{
              margin: "14px 0 16px",
              padding: "12px 14px",
              borderRadius: "10px",
              backgroundColor: "#fff7ed",
              border: `1px solid ${themeColor}`,
              fontSize: "14px",
              fontWeight: 600,
              color: darkColor,
              lineHeight: 1.6,
            }}
          >
            {ui.demoNotice}
          </div>
          <a
            {...demoLinkProps}
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
            {ui.demoOpen}
          </a>
        </SectionCard>

        <SectionCard id="resources" title={ui.resourcesTitle} icon="🔗">
          <p style={{ marginTop: 0, lineHeight: 1.75, color: "#444" }}>
            {ui.resourcesLead}
          </p>
          <ul style={{ margin: "0 0 16px", paddingLeft: "20px", lineHeight: 1.85 }}>
            <li>
              <Link to="/hub" style={{ color: darkColor, fontWeight: 700 }}>
                {ui.hubLink}
              </Link>
            </li>
            <li>
              <a href="/report.html" target="_blank" rel="noopener noreferrer" style={{ color: darkColor }}>
                {ui.reportLink}
              </a>
            </li>
            <li>
              <a href="/memo.html" target="_blank" rel="noopener noreferrer" style={{ color: darkColor }}>
                {ui.memoLink}
              </a>
            </li>
          </ul>
        </SectionCard>

        <SectionCard id="pricing" title={ui.pricingTitle} icon="💴">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {ui.plans.map((plan) => (
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
                {plan.checkout && (
                  <a
                    href={STRIPE_STANDARD_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button"
                    style={{
                      display: "inline-block",
                      marginTop: "14px",
                      backgroundColor: themeColor,
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {ui.subscribe}
                  </a>
                )}
              </div>
            ))}
          </div>
          <p style={{ margin: "14px 0 0", fontSize: "12px", color: "#777" }}>
            {ui.pricingNote}
          </p>
        </SectionCard>

        <SectionCard id="contact" title={ui.contactTitle} icon="✉️">
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
              <p style={{ margin: 0, fontWeight: 700 }}>{ui.sentTitle}</p>
              <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: 1.7 }}>
                {ui.sentBody}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormStatus("idle");
                  setForm({
                    name: "",
                    email: "",
                    company: "",
                    category: L.form.defaultCategory,
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
                {ui.resend}
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
                  {L.form.labels.name} <span style={{ color: "#b91c1c" }}>*</span>
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
                  {L.form.labels.email} <span style={{ color: "#b91c1c" }}>*</span>
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
                  {L.form.labels.company}
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
                  {L.form.labels.category}
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  {L.form.categories.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="message" style={labelStyle}>
                  {L.form.labels.message} <span style={{ color: "#b91c1c" }}>*</span>
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
                  {locale === "en" ? `${ui.agreePrivacy} ` : null}
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
                    {L.form.labels.privacy}
                  </button>
                  {locale === "ja" ? ` ${ui.agreePrivacy}` : null}{" "}
                  <span style={{ color: "#b91c1c" }}>*</span>
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
                {formStatus === "sending" ? ui.submitting : ui.submit}
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
            <p style={{ margin: "0 0 6px", fontWeight: 700 }}>{ui.otherContact}</p>
            <p style={{ margin: 0 }}>TEL：{company.phoneFull}</p>
            <p style={{ margin: "6px 0 0" }}>Mail：{company.email}</p>
          </div>
        </SectionCard>

        <SectionCard id="company" title={ui.companyTitle} icon="🏢">
          <dl style={{ margin: 0, display: "grid", gap: "10px", fontSize: "14px" }}>
            {L.companyFields.map(([dt, key]) => (
              <div key={dt} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px" }}>
                <dt style={{ fontWeight: 700, color: darkColor }}>{dt}</dt>
                <dd style={{ margin: 0, color: "#444", lineHeight: 1.6 }}>{company[key]}</dd>
              </div>
            ))}
          </dl>
          <div style={{ marginTop: "22px" }}>
            <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: "15px", color: darkColor }}>
              {ui.mapTitle}
            </p>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                lineHeight: 0,
              }}
            >
              <iframe
                title={ui.mapTitle}
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={GOOGLE_MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                color: darkColor,
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {ui.mapLink} ↗
            </a>
          </div>
        </SectionCard>

        <SectionCard id="tokusho" title={ui.tokushoTitle} icon="📋">
          <p style={{ fontSize: "13px", color: "#666", marginTop: 0 }}>{ui.tokushoNote}</p>
          <dl style={{ margin: 0, fontSize: "14px", lineHeight: 1.75 }}>
            {L.tokushoRows.map(([dt, key]) => (
              <div key={dt} style={{ marginBottom: "12px" }}>
                <dt style={{ fontWeight: 700, color: darkColor }}>{dt}</dt>
                <dd style={{ margin: "4px 0 0", color: "#444" }}>
                  {company[key] ?? L.tokushoValues[key]}
                </dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard id="privacy" title={ui.privacyTitle} icon="🔒">
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#444", marginTop: 0 }}>
            {L.privacyIntro(company.name, company.product, SITE_URL)}
          </p>
          {privacySections.map((section) => (
            <LegalBlock key={section.title} title={section.title} paragraphs={section.paragraphs} />
          ))}
          <p style={{ fontSize: "13px", color: "#777", marginBottom: 0 }}>{L.privacyDates}</p>
        </SectionCard>

        <SectionCard id="terms" title={ui.termsTitle} icon="📜">
          {L.termsSections.map((section) => (
            <LegalBlock key={section.title} title={section.title} paragraphs={section.paragraphs} />
          ))}
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
            {locale === "ja"
              ? `${company.name}（${company.nameEn}）`
              : company.name}
            <br />
            {company.product}
            {locale === "ja" ? ` / ${company.productEn}` : ""}
          </p>
          <p style={{ margin: "0 0 14px", lineHeight: 1.7 }}>
            {company.address}
            <br />
            TEL {company.phone} / {company.email}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {L.nav.filter((n) => n.id !== "top").map((item) => (
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
            {L.resources.map((item) =>
              item.internal ? (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{ color: themeColor, fontSize: "13px" }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: themeColor, fontSize: "13px" }}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
          <p style={{ margin: "18px 0 0", color: "#94a3b8", fontSize: "12px" }}>
            &copy; {new Date().getFullYear()} {company.nameEn}. All rights reserved.
            <br />
            {ui.footerFictional}
          </p>
        </div>
      </footer>

      {showScrollTop && (
        <button
          type="button"
          className="scroll-top-btn"
          aria-label={ui.scrollTop}
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
