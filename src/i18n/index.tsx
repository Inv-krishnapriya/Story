import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./lang/en.json";
import ja from "./lang/ja.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ja,
      en,
    },
  });

export default i18n;
