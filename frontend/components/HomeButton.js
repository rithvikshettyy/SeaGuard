import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const HomeButton = ({ title, icon, onPress, buttonStyle, buttonColor }) => (
  <TouchableOpacity style={[styles.button, buttonStyle, buttonColor && { backgroundColor: buttonColor }]} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={40} color={COLORS.primary} />
    </View>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: '45%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    marginBottom: 10,
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeButton;
