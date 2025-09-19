import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const PurposeOnboardingScreen = ({ navigation }) => {
  const [selectedPurpose, setSelectedPurpose] = useState(null);

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
          <TouchableOpacity style={styles.languageButton}>
            <Ionicons name="language-outline" size={24} color={COLORS.text} />
            <Text style={styles.languageText}>Choose Language (Default: English IN)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>How do you plan to use SeaGuard?</Text>
          <Text style={styles.subtitle}>
            Choose your fishing style so we can customize your catch monitoring, analytics, and features to match your goals.
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionCard, selectedPurpose === 'Hobby' && styles.selectedCard]}
              onPress={() => handleSelectPurpose('Hobby')}
            >
              <Ionicons name="fish" size={24} color={selectedPurpose === 'Hobby' ? '#fff' : COLORS.primary} />
              <Text style={[styles.optionTitle, selectedPurpose === 'Hobby' && styles.selectedText]}>Hobby Fisher</Text>
              <Text style={[styles.optionDescription, selectedPurpose === 'Hobby' && styles.selectedText]}>
                Track your catches, explore new spots, and celebrate your fishing journey. Ideal for casual or weekend fishing.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, selectedPurpose === 'Commercial' && styles.selectedCard]}
              onPress={() => handleSelectPurpose('Commercial')}
            >
              <Ionicons name="boat" size={24} color={selectedPurpose === 'Commercial' ? '#fff' : COLORS.primary} />
              <Text style={[styles.optionTitle, selectedPurpose === 'Commercial' && styles.selectedText]}>Commercial Fisher</Text>
              <Text style={[styles.optionDescription, selectedPurpose === 'Commercial' && styles.selectedText]}>
                Monitor catch volumes, manage quotas, and optimize your yield. Perfect for full-time or small business fishing.
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
