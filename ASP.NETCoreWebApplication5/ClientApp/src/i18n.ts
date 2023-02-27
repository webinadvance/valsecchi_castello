import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import i18nextMiddleware from "i18next-http-middleware";

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        backend: {
            loadPath: "/api/db/locales/{{lng}}"
        },
        interpolation: {
            escapeValue: true,
        },
    });

export default i18n;