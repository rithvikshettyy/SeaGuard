import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { COLORS } from '../constants/colors';

const catchLogs = [
  {
    id: '1',
    date: 'Sep 8, 2025',
    time: '8:30 AM',
    weight: '45.1 kg',
    fishType: 'Pomfret',
    location: '12.2502° N, 64.3372° E',
    image: require('../assets/pomfretbg.png'), // New image for Pomfret
    bgColor: '#E67E22', // Orange
  },
  {
    id: '2',
    date: 'Sep 8, 2025',
    time: '8:30 AM',
    weight: '34.5 kg',
    fishType: 'Mackerel',
    location: '12.2502° N, 64.3372° E',
    image: require('../assets/mackerelbg.png'), // New image for Mackerel
    bgColor: '#3498DB', // Blue
  },
  {
    id: '3',
    date: 'Sep 8, 2025',
    time: '8:30 AM',
    weight: '34.5 kg',
    fishType: 'Prawns',
    location: '12.2502° N, 64.3372° E',
    image: require('../assets/prawnbg.png'), // New image for Prawns
    bgColor: '#E67E22', // Orange
  },
  {
    id: '4',
    date: 'Sep 8, 2025',
    time: '8:30 AM',
    weight: '45.1 kg',
    fishType: 'Sardine',
    location: '12.2502° N, 64.3372° E',
    image: require('../assets/sardinebg.png'), // New image for Sardine
    bgColor: '#3498DB', // Blue
  },
];

const CatchRecordScreen = ({ navigation }) => {
  const renderCatchItem = ({ item }) => (
    <TouchableOpacity style={styles.catchItem}>
      <ImageBackground source={item.image} style={styles.catchItemImageBackground} imageStyle={styles.catchItemImageStyle}>
        <View style={styles.catchItemContentWrapper}>
          <View>
            <Text style={styles.catchItemDate}>{item.date} - {item.time}</Text>
            <Text style={styles.catchItemWeight}>{item.weight}</Text>
            <View style={styles.catchItemDetails}>
              <Ionicons name="play" size={12} color="#FFF" style={{ marginRight: 5 }} />
              <Text style={styles.catchItemFishType}>{item.fishType}</Text>
              <Ionicons name="location" size={12} color="#FFF" style={{ marginLeft: 10, marginRight: 5 }} />
              <Text style={styles.catchItemLocation}>{item.location}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Catch Logs</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {/* Today's Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Today's Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>59.1kg</Text>
              <Text style={styles.statLabel}>Total Catch</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Tuna</Text>
              <Text style={styles.statLabel}>Most Common</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.6kg</Text>
              <Text style={styles.statLabel}>Avg / Outing</Text>
            </View>
          </View>
        </View>

        {/* Monthly Log Header */}
        <View style={styles.monthlyLogHeader}>
          <Text style={styles.monthlyLogTitle}>September 2025</Text>
          <Ionicons name="calendar-outline" size={24} color={COLORS.text} />
        </View>

        {/* Catch Log List */}
        <FlatList
          data={catchLogs}
          renderItem={renderCatchItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.catchListContent}
          scrollEnabled={false} // Nested in ScrollView
        />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('LogNewCatch')}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#183050',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 80, // Space for FAB and bottom nav
  },
  statsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  monthlyLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthlyLogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  catchListContent: {
    // No specific padding needed here, handled by scrollViewContent
  },
  catchItem: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    height: 120, // Fixed height for consistency
  },
  catchItemImageBackground: {
    flex: 1, // Take full space of parent TouchableOpacity
    justifyContent: 'center', // Center content vertically
  },
  catchItemImageStyle: {
    resizeMode: 'cover', // Equivalent to contentFit="cover"
  },
  catchItemContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  catchItemTextContent: {
    justifyContent: 'center',
  },
  catchItemDate: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 5,
  },
  catchItemWeight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  catchItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catchItemFishType: {
    fontSize: 14,
    color: '#FFF',
  },
  catchItemLocation: {
    fontSize: 12,
    color: '#FFF',
  },
  fab: {
    position: 'absolute',
    bottom: 100, // Above bottom nav bar
    right: 20,
    backgroundColor: '#183050',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CatchRecordScreen;