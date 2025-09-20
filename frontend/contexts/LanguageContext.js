import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { getAvailableLanguages, screenTexts } from '../constants/screenTexts';

const LanguageContext = createContext();

const LANGUAGE_KEY = '@app_language';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const initializeLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      return savedLanguage || 'en';
    } catch (error) {
      console.error('Error loading language:', error);
      return 'en';
    }
  };

  // Initialize language from storage
  useEffect(() => {
    const init = async () => {
      const initialLanguage = await initializeLanguage();
      setLanguage(initialLanguage);
      setIsLoading(false);
    };
    init();
  }, []);

  const changeLanguage = async (newLanguage) => {
    if (getAvailableLanguages().includes(newLanguage)) {
      try {
        setIsLoading(true);
        await AsyncStorage.setItem(LANGUAGE_KEY, newLanguage);
        setLanguage(newLanguage);
      } catch (error) {
        console.error('Error saving language:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const translate = (screen, key) => {
    const sections = key.split('.');
    let translation = screenTexts[screen]?.[language];
    
    for (const section of sections) {
      translation = translation?.[section];
      if (!translation) {
        // Fallback to English
        translation = screenTexts[screen]?.['en'];
        for (const s of sections) {
          translation = translation?.[s];
        }
        break;
      }
    }
    
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage,
      isRTL: I18nManager.isRTL,
      isLoading,
      translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};