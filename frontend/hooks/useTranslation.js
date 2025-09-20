import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  const t = (key) => {
    try {
      // Split the key by dots to access nested properties
      const keys = key.split('.');
      let result = translations[currentLanguage];
      
      for (const k of keys) {
        result = result[k];
      }
      
      // If translation doesn't exist, fallback to English
      if (!result && currentLanguage !== 'en') {
        result = translations['en'];
        for (const k of keys) {
          result = result[k];
        }
      }
      
      return result || key;
    } catch (error) {
      // If any error occurs, return the key itself
      return key;
    }
  };

  return { t, currentLanguage };
};