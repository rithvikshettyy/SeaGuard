import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import WeatherWidget from '../components/WeatherWidget';

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Emergency SOS Button */}
      <TouchableOpacity 
        style={styles.sosButton}
        onPress={() => navigation.navigate('SOS')}
      >
        <Text style={styles.sosText}>Emergency SOS</Text>
      </TouchableOpacity>

      {/* Current Location Section */}
      <View style={styles.locationContainer}>
        <View style={styles.locationHeader}>
          <View style={styles.locationTitleRow}>
            <Text style={styles.locationIcon}>⊙</Text>
            <Text style={styles.locationTitle}>Current Location</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton}>
            <Text style={styles.refreshIcon}>⟲</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.coordinatesRow}>
          <View style={styles.coordinateGroup}>
            <Text style={styles.coordinateLabel}>Latitude:</Text>
            <Text style={styles.coordinateValue}>40.80773585</Text>
          </View>
          <View style={styles.coordinateGroup}>
            <Text style={styles.coordinateLabel}>Longitude:</Text>
            <Text style={styles.coordinateValue}>-73.96164115567529</Text>
          </View>
        </View>

        <View style={styles.locationDetails}>
          <Text style={styles.locationDetail}>Last Update: 11:23:16 Hrs</Text>
          <Text style={styles.locationDetail}>Accuracy: +-50m</Text>
        </View>
      </View>

      {/* Weather Section */}
      <View style={styles.weatherSection}>
        <Text style={styles.weatherTitle}>Weather Conditions</Text>
        
        <View style={styles.weatherMainContainer}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>27°</Text>
            <View style={styles.cloudIcon}>
              <Text style={styles.cloudEmoji}>☁️</Text>
            </View>
          </View>
          
          <View style={styles.weatherDetailsContainer}>
            <Text style={styles.weatherDescription}>Partly Cloudy</Text>
            <Text style={styles.windSpeed}>Wind Speed: 10.9km/h</Text>
          </View>
        </View>

        <View style={styles.weatherStatsRow}>
          <View style={styles.weatherStat}>
            <Text style={styles.statLabel}>Feels Like</Text>
            <Text style={styles.statValue}>31°C</Text>
          </View>
          <View style={styles.weatherStat}>
            <Text style={styles.statLabel}>Humidity</Text>
            <Text style={styles.statValue}>69%</Text>
          </View>
          <View style={styles.weatherStat}>
            <Text style={styles.statLabel}>Chance of Rain</Text>
            <Text style={styles.statValue}>96%</Text>
          </View>
          <View style={styles.weatherStat}>
            <Text style={styles.statLabel}>Pressure</Text>
            <Text style={styles.statValue}>1000mbar</Text>
          </View>
        </View>
      </View>

      {/* Updates Section */}
      <View style={styles.updatesContainer}>
        <View style={styles.updatesHeader}>
          <Text style={styles.updatesIcon}>📊</Text>
          <Text style={styles.updatesTitle}>Updates</Text>
        </View>
        
        <View style={styles.updatesList}>
          <View style={styles.updateItem}>
            <Text style={styles.updateBullet}>•</Text>
            <Text style={styles.updateText}>Chance of High Tides on Mumbai Coast - TOI</Text>
          </View>
          <View style={styles.updateItem}>
            <Text style={styles.updateBullet}>•</Text>
            <Text style={styles.updateText}>Tuna Fish scarcity near West Bengal - HT</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.viewMoreContainer}>
          <Text style={styles.viewMoreText}>View More ∨</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  sosButton: {
    backgroundColor: '#dc143c',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sosText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  locationContainer: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    padding: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 18,
    color: '#666666',
    marginRight: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  refreshButton: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 18,
    color: '#666666',
  },
  coordinatesRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  coordinateGroup: {
    flex: 1,
  },
  coordinateLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  coordinateValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  locationDetails: {
    gap: 4,
  },
  locationDetail: {
    fontSize: 13,
    color: '#666666',
  },
  weatherSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  weatherMainContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#333333',
    marginRight: 16,
  },
  cloudIcon: {
    marginLeft: 8,
  },
  cloudEmoji: {
    fontSize: 48,
  },
  weatherDetailsContainer: {
    alignItems: 'center',
  },
  weatherDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  windSpeed: {
    fontSize: 14,
    color: '#666666',
  },
  weatherStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  weatherStat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  updatesContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  updatesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  updatesIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  updatesTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  updatesList: {
    marginBottom: 16,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingLeft: 8,
  },
  updateBullet: {
    fontSize: 16,
    color: '#333333',
    marginRight: 12,
    marginTop: 1,
  },
  updateText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    lineHeight: 20,
  },
  viewMoreContainer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default HomeScreen;