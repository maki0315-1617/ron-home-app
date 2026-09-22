import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import LandingPage from "./LandingPage.jsx";
import LegacyHub from "./LegacyHub.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hub" element={<LegacyHub />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
