import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import itLocale from './locale.it.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            it: {
                translation: itLocale,
            },
        },
        interpolation: {
            escapeValue: true,
        },
    });

export default i18n;
