import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { COLORS } from '../constants/colors';

const NewsCard = ({ item }) => {
  const { title, publishedAt, description, url, source } = item;

  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No Date';

  return (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(url)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{formattedDate} - {source.name}</Text>
      <Text style={styles.summary}>{description || 'No description available.'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
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