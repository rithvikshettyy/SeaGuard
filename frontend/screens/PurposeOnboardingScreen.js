import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { screenTexts } from '../constants/screenTexts';
import { useLanguage } from '../contexts/LanguageContext';
import { getAvailableLanguages, getLanguageNames } from '../constants/screenTexts';

const { width } = Dimensions.get('window');

const PurposeOnboardingScreen = ({ navigation }) => {
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { language, changeLanguage } = useLanguage();

  const LANGUAGES = getAvailableLanguages().map(code => ({
    code,
    name: getLanguageNames()[code]
  }));

  const handleLanguageSelect = (languageCode) => {
    changeLanguage(languageCode);
    setModalVisible(false);
  };

  const handleSelectPurpose = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleProceed = () => {
    navigation.navigate('Main', { screen: 'HomeTab', params: { userType: selectedPurpose } });
  };

  return (
    <ImageBackground 
      source={require('../assets/onboardingpagebackground.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="language-outline" size={24} color={COLORS.text} />
            <Text style={styles.languageText}>{getLanguageNames()[language]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{screenTexts.PurposeOnboardingScreen[language].title}</Text>
          <Text style={styles.subtitle}>
            {screenTexts.PurposeOnboardingScreen[language].subtitle}
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionCard, selectedPurpose === 'Hobby' && styles.selectedCard]}
              onPress={() => handleSelectPurpose('Hobby')}
            >
              <Ionicons name="fish" size={24} color={selectedPurpose === 'Hobby' ? '#fff' : COLORS.primary} />
              <Text style={[styles.optionTitle, selectedPurpose === 'Hobby' && styles.selectedText]}>
                {screenTexts.PurposeOnboardingScreen[language].hobbyTitle}
              </Text>
              <Text style={[styles.optionDescription, selectedPurpose === 'Hobby' && styles.selectedText]}>
                {screenTexts.PurposeOnboardingScreen[language].hobbyDescription}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, selectedPurpose === 'Commercial' && styles.selectedCard]}
              onPress={() => handleSelectPurpose('Commercial')}
            >
              <Ionicons name="boat" size={24} color={selectedPurpose === 'Commercial' ? '#fff' : COLORS.primary} />
              <Text style={[styles.optionTitle, selectedPurpose === 'Commercial' && styles.selectedText]}>
                {screenTexts.PurposeOnboardingScreen[language].commercialTitle}
              </Text>
              <Text style={[styles.optionDescription, selectedPurpose === 'Commercial' && styles.selectedText]}>
                {screenTexts.PurposeOnboardingScreen[language].commercialDescription}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>{screenTexts.PurposeOnboardingScreen[language].proceed}</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>
                {screenTexts.PurposeOnboardingScreen[language].chooseLanguage}
              </Text>
              <FlatList
                data={LANGUAGES}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.languageItem}
                    onPress={() => handleLanguageSelect(item.code)}
                  >
                    <Text style={styles.languageText}>{item.name}</Text>
                    {language === item.code && (
                      <Ionicons name="checkmark" size={24} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.code}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.primary,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent overlay
    justifyContent: 'space-between',
    paddingBottom: 40, // Space for the button
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  languageText: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.text,
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center', // Center content horizontally
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure options take full width
  },
  optionCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.lightText,
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  proceedButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PurposeOnboardingScreen;
