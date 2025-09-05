import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const NewsCard = ({ item }) => (
  <View style={[styles.card, item.type === 'alert' && styles.alertCard]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.date}>{item.date}</Text>
    <Text style={styles.summary}>{item.summary}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  alertCard: {
    backgroundColor: COLORS.warning,
    borderColor: COLORS.warning,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: COLORS.lightText,
    fontSize: 12,
    marginTop: 5,
  },
  summary: {
    color: COLORS.text,
    fontSize: 14,
    marginTop: 10,
  },
});

export default NewsCard;
