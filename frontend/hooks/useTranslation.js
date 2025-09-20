import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    try {
      // Split the key by dots to access nested properties
      const keys = key.split('.');
      let result = screenTexts;
      
      const [screenKey, ...rest] = keys;
      const translations = require('../constants/screenTexts').screenTexts;
      
      let value = translations[screenKey];
      if (!value) return key;

      value = value[language] || value['en'];
      if (!value) return key;

      for (const k of rest) {
        value = value?.[k];
        if (value === undefined) return key;
      }

      return value;
    } catch (error) {
      // If any error occurs, return the key itself
      return key;
    }
  };

  return { t, currentLanguage };
};