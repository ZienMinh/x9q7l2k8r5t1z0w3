import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en.json';
import vi from './lang/vi.json';
import zh from './lang/zh.json';
import kr from './lang/kr.json';
// import ru from './lang/ru.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  supportedLngs: ['vi', 'en', 'zh', 'kr'],
  load: 'all',
  compatibilityJSON: 'v3',
  ns: ['common', 'emotion'],
  defaultNS: 'common',
  debug: true,
  resources: {
    en,
    vi,
    zh,
    kr,
    // kr,
    // cn,
    // ru,
  },
});

export default i18n;
