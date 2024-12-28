import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../src/locales/en/common.json';
import uz from '../src/locales/uz/common.json';
import ru from '../src/locales/ru/common.json';

const resources = {
	en: {
		translation: en,
	},
	uz: {
		translation: uz,
	},
	ru: {
		translation: ru,
	},
};
const selectedLanguage = localStorage.getItem('i18nextLng') || 'en';
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		detection: {
			checkWhitelist: true, // options for language detection
		},
		debug: false,
		lng: selectedLanguage,
		fallbackLng: selectedLanguage,
		keySeparator: false,
		whitelist: resources,
		// language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option
		interpolation: {
			escapeValue: false,
		},
		react: { useSuspense: false },
	});
export default i18n;
