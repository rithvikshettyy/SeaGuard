import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const LanguagePicker = () => (
  <View style={styles.container}>
    <Text style={styles.text}>English (Default)</Text>
    {/* Mock dropdown picker */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  text: {
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default LanguagePicker;
