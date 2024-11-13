import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

import { initReactI18next } from 'react-i18next';

import { LANGUAGES } from '@/constants';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],

      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18nextLng',

      caches: ['localStorage'],
    },
    supportedLngs: LANGUAGES.map((language) => language.key),
    ns: ['translations'],
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath:
        import.meta.env.VITE_BACKEND_URL + '/locales/{{lng}}/{{ns}}.json',
    },
  });

i18n.services.formatter?.add(
  'DATE_HUGE',
  (value: Date, lng: string | undefined) => {
    const language = lng || i18n.language || 'en';
    return DateTime.fromJSDate(value)
      .setLocale(language)
      .toLocaleString(DateTime.DATE_HUGE);
  }
);

export default i18n;
