import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import itLocale from "./locales/it.json";
import enLocale from "./locales/en.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        resources: {
            it: {
                translation: itLocale,
            },
            en: {
                translation: enLocale,
            },
        },
        interpolation: {
            escapeValue: true,
        },
    });

export default i18n;