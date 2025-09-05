import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { COLORS } from '../constants/colors';

const HeatmapScreen = () => {
  const [isPfzEnabled, setIsPfzEnabled] = React.useState(true);
  const [isRestrictedEnabled, setIsRestrictedEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Heatmap</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map Placeholder</Text>
        <View style={styles.mockPfzZone} />
        <View style={styles.mockRestrictedZone} />
      </View>
      <View style={styles.togglesContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Show PFZ Zones</Text>
          <Switch value={isPfzEnabled} onValueChange={setIsPfzEnabled} trackColor={{ false: COLORS.lightText, true: COLORS.primary }} thumbColor={COLORS.white} />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Show Restricted Areas</Text>
          <Switch value={isRestrictedEnabled} onValueChange={setIsRestrictedEnabled} trackColor={{ false: COLORS.lightText, true: COLORS.primary }} thumbColor={COLORS.white} />
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
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapText: {
    color: COLORS.lightText,
    fontSize: 24,
  },
  mockPfzZone: {
    position: 'absolute',
    top: '20%',
    left: '15%',
    width: '40%',
    height: '30%',
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 82, 212, 0.2)',
  },
  mockRestrictedZone: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    width: '50%',
    height: '25%',
    borderColor: COLORS.sos,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(217, 45, 32, 0.2)',
  },
  togglesContainer: {
    padding: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleLabel: {
    color: COLORS.text,
    fontSize: 18,
  },
});

export default HeatmapScreen;
