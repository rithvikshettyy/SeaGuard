import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';

const TrackerScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>My Tracker</Text>
    <View style={styles.mapPlaceholder}>
      <Text style={styles.mapText}>Map Placeholder</Text>
      {/* Mock GPS Route Line */}
      <View style={styles.mockRoute} />
    </View>
    <View style={styles.warningBox}>
      <Text style={styles.warningText}>WARNING: Leaving geofenced area!</Text>
    </View>
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
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapText: {
    color: COLORS.lightText,
    fontSize: 24,
  },
  mockRoute: {
    position: 'absolute',
    width: 5,
    height: '80%',
    backgroundColor: COLORS.primary,
    transform: [{ rotate: '15deg' }],
  },
  warningBox: {
    backgroundColor: COLORS.warning,
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  warningText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TrackerScreen;
