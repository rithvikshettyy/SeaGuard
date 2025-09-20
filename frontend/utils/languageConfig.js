import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

// Language settings keys
const LANGUAGE_KEY = '@seaguard/language';

// RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export const initializeLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      await setAppLanguage(savedLanguage);
    }
    return savedLanguage || 'en';
  } catch (error) {
    console.error('Error initializing language:', error);
    return 'en';
  }
};

export const setAppLanguage = async (languageCode) => {
  try {
    // Save language preference
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);

    // Handle RTL layout if needed
    const isRTL = RTL_LANGUAGES.includes(languageCode);
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      // Reload app to apply RTL changes
      await Updates.reloadAsync();
    }

    return true;
  } catch (error) {
    console.error('Error setting app language:', error);
    return false;
  }
};

export const getAppLanguage = async () => {
  try {
    return await AsyncStorage.getItem(LANGUAGE_KEY) || 'en';
  } catch (error) {
    console.error('Error getting app language:', error);
    return 'en';
  }
};