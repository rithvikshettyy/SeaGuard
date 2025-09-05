import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import BigButton from '../components/BigButton';

const TripPlanningScreen = () => {
  const handleDownload = () => {
    Alert.alert('Success', 'PFZ snapshot for your area has been downloaded.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Plan Your Trip</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Date & Time</Text>
          <Text style={styles.infoText}>2025-09-02, 6:00 AM</Text>
          {/* Mock DateTime Picker */}
        </View>

        <BigButton title="Download PFZ Snapshot" onPress={handleDownload} />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Tide Information</Text>
          <Text style={styles.infoText}>High Tide: 8:30 AM</Text>
          <Text style={styles.infoText}>Low Tide: 2:15 PM</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Moon Phase</Text>
          <Text style={styles.infoText}>Waxing Crescent</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
  header: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    color: COLORS.text,
    fontSize: 16,
  },
});

export default TripPlanningScreen;
