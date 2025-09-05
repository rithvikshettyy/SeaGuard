import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const WeatherWidget = () => (
  <View style={styles.widget}>
    <Text style={styles.title}>⟟ Current Location</Text>
    <Text style={styles.text}>Location: Kanyakumari</Text>
    <Text style={styles.text}>Weather: Sunny, 32°C</Text>
    <Text style={styles.text}>Tide: Low, 0.5m</Text>
    <Text style={styles.text}>Wind: 12 km/h NW</Text>
  </View>
);

const styles = StyleSheet.create({
  widget: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 5,
  },
});

export default WeatherWidget;
