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
    navigation.navigate('Main', { screen: 'Profile', params: { userType: selectedPurpose } });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/oceanbg.png')} style={styles.backgroundImage}>
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
              <Ionicons name="fish" size={24} color={selectedPurpose === 'Hobby' ? COLORS.white : COLORS.primary} />
              <Text style={[styles.optionTitle, selectedPurpose === 'Hobby' && styles.selectedText]}>Hobby Fisher</Text>
              <Text style={[styles.optionDescription, selectedPurpose === 'Hobby' && styles.selectedText]}>
                Track your catches, explore new spots, and celebrate your fishing journey. Ideal for casual or weekend fishing.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, selectedPurpose === 'Commercial' && styles.selectedCard]}
              onPress={() => handleSelectPurpose('Commercial')}
            >
              <Ionicons name="boat" size={24} color={selectedPurpose === 'Commercial' ? COLORS.white : COLORS.primary} />
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: COLORS.white,
  },
  proceedButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  proceedButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PurposeOnboardingScreen;
