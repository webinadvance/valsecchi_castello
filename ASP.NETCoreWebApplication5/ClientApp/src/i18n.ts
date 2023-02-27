import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    //.use(resourcesToBackend((language: any, namespace: any) => import(`./locales/${language}.json`)))
    .init({
        lng: "en",
        fallbackLng: "en",
        /*        resources: {
                    it: {
                        translation: itLocale,
                    },
                    en: {
                        translation: enLocale,
                    },
                },*/
        backend: {
            loadPath: "./locales/{{lng}}.json"
        },
        interpolation: {
            escapeValue: true,
        },
    });

export default i18n;