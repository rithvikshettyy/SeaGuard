import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const features = [
  { name: 'No Fishing Zone', icon: 'boat-outline', screen: 'NoFishingZone' },
  { name: 'Potential Fishing Zone', icon: 'fish-outline', screen: 'PotentialFishingZone' },
  { name: 'GPS and Navigation', icon: 'navigate-outline', screen: 'GpsNavigation' },
  { name: 'Disaster Alert', icon: 'warning-outline', screen: 'DisasterAlert' },
  { name: 'Important Contacts', icon: 'call-outline', screen: 'ImportantContacts' },
  { name: 'IBL Alerts', icon: 'alert-circle-outline', screen: 'IBLAlerts' },
  { name: 'Other Services', icon: 'apps-outline', screen: 'OtherServices' },
  { name: 'Sea Safety and Livelihood', icon: 'shield-checkmark-outline', screen: 'SeaSafetyLivelihood' },
  { name: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  { name: 'About', icon: 'information-circle-outline', screen: 'About' },
];

const FeaturesScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Features</Text>
      </View>
      <View style={styles.grid}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(feature.screen)}
          >
            <Ionicons name={feature.icon} size={32} color={COLORS.primary} />
            <Text style={styles.cardText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '45%',
    margin: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    minHeight: 120,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
  },
});

export default FeaturesScreen;
