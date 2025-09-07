import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import { COLORS } from '../constants/colors';
import NewsCard from '../components/NewsCard';

const NewsScreen = ({ route }) => {
  const { articles } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>News & Alerts</Text>
      {articles && articles.length > 0 ? (
        <FlatList
          data={articles}
          renderItem={({ item }) => <NewsCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noNewsText}>No news available at the moment.</Text>
      )}
    </SafeAreaView>
  );
};

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
  noNewsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.lightText,
  },
});

export default NewsScreen;