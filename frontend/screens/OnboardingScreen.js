import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import BigButton from '../components/BigButton';
import LanguagePicker from '../components/LanguagePicker';

const OnboardingScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.logo}>LOGO</Text>
      <Text style={styles.tagline}>Your Fishing Companion</Text>
      <LanguagePicker />
      <BigButton title="Get Started" onPress={() => navigation.replace('Login')} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    color: COLORS.text,
    fontSize: 18,
    marginBottom: 40,
  },
});

export default OnboardingScreen;
