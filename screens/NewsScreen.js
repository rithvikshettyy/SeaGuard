import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import NewsCard from '../components/NewsCard';

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Cyclone Alert for Tamil Nadu Coast',
    date: '2025-09-03',
    summary: 'A severe cyclone is expected to make landfall tomorrow. Fishermen are advised not to venture into the sea.',
    type: 'alert',
  },
  {
    id: '2',
    title: 'New Government Subsidy Announced',
    date: '2025-09-01',
    summary: 'The government has announced a new subsidy for fishing nets and equipment.',
    type: 'news',
  },
  {
    id: '3',
    title: 'High Waves Expected',
    date: '2025-08-30',
    summary: 'Waves up to 3 meters are expected due to strong offshore winds.',
    type: 'news',
  },
];

const NewsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>News & Alerts</Text>
    <FlatList
      data={MOCK_NEWS}
      renderItem={({ item }) => <NewsCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default NewsScreen;
