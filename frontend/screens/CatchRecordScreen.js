import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { COLORS } from '../constants/colors';
import catchLogsData from '../constants/catchLogsData.json'; // Import the JSON file for initial data
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useIsFocused } from '@react-navigation/native';

const CatchRecordScreen = ({ navigation, route }) => {
  const [catchLogs, setCatchLogs] = useState([]); // Initialize as empty, will load from storage
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadInitialLogs = async () => {
      try {
        const storedLogs = await AsyncStorage.getItem('catchLogs');
        if (storedLogs !== null) {
          setCatchLogs(JSON.parse(storedLogs));
        } else {
          // If no logs in AsyncStorage, use the initial data from the JSON file
          setCatchLogs(catchLogsData);
          // Optionally, save this initial data to AsyncStorage for future use
          await AsyncStorage.setItem('catchLogs', JSON.stringify(catchLogsData));
        }
      } catch (error) {
        console.error('Error loading initial catch logs:', error);
      }
    };

    loadInitialLogs();

    // Listener for when the screen is focused to ensure latest data is loaded
    const unsubscribe = navigation.addListener('focus', () => {
      loadInitialLogs();
    });

    return unsubscribe; // Cleanup the listener
  }, [navigation]);

  const handleDeleteLog = async (logId) => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this catch log?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const updatedLogs = catchLogs.filter(log => log.id !== logId);
              setCatchLogs(updatedLogs);
              await AsyncStorage.setItem('catchLogs', JSON.stringify(updatedLogs));
            } catch (error) {
              console.error('Error deleting catch log:', error);
              Alert.alert('Error', 'Failed to delete catch log.');
            }
          }
        }
      ]
    );
  };

  // Calculate statistics
  const totalCatch = catchLogs.reduce((acc, log) => {
    const weightValue = parseFloat(log.weight.replace('kg', ''));
    return acc + (isNaN(weightValue) ? 0 : weightValue);
  }, 0).toFixed(1);

  const mostCommonFish = (() => {
    if (catchLogs.length === 0) return 'N/A';
    const fishTypeCounts = catchLogs.reduce((acc, log) => {
      acc[log.fishType] = (acc[log.fishType] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(fishTypeCounts).reduce((a, b) =>
      fishTypeCounts[a] > fishTypeCounts[b] ? a : b
    );
  })();


  const renderCatchItem = ({ item }) => (
    <View style={styles.catchItem}>
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
          <TouchableOpacity onPress={() => handleDeleteLog(item.id)}>
            <Ionicons name="close-circle" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
          <Text style={styles.statsTitle}>Catch Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalCatch}kg</Text>
              <Text style={styles.statLabel}>Total Catch</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mostCommonFish}</Text>
              <Text style={styles.statLabel}>Most Common</Text>
            </View>
          </View>
        </View>

        {/* Monthly Log Header */}
        <View style={styles.monthlyLogHeader}>
          <Text style={styles.monthlyLogTitle}>Filter</Text>
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