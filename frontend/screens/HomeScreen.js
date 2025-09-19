import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { useHeaderHeight } from '@react-navigation/elements';
import { COLORS } from '../constants/colors';
import { Env } from '../constants/env';

const BASE_URL = Env.BASE_URL;

const HomeScreen = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [fishingAlert, setFishingAlert] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchFishingAlert = async (latitude, longitude) => {
    try {
      // NOTE: Replace with your actual backend IP/domain if not running on localhost in production
      const response = await fetch(`${BASE_URL}/fishing-alert?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setFishingAlert(data);
    } catch (error) {
      setErrorMsg(`Failed to fetch fishing alert: ${error.message}`);
    }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      try {
        const reverseGeocode = await Location.reverseGeocodeAsync(currentLocation.coords);
        if (reverseGeocode.length > 0) {
          setAddress(`${reverseGeocode[0].city}, ${reverseGeocode[0].subregion}`);
        }
      } catch (geocodeError) {
        console.warn("Reverse geocoding failed:", geocodeError);
        setAddress(`${currentLocation.coords.latitude.toFixed(2)}°N, ${currentLocation.coords.longitude.toFixed(2)}°E`);
      }

      await fetchFishingAlert(currentLocation.coords.latitude, currentLocation.coords.longitude);

    } catch (error) {
      setErrorMsg(`An error occurred: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    loadData();

    return () => clearInterval(timer);
  }, [loadData]);

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog',
      51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
      56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
      61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      66: 'Light freezing rain', 67: 'Heavy freezing rain',
      71: 'Slight snow fall', 73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      85: 'Slight snow showers', 86: 'Heavy snow showers',
      95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown';
  };

  const getFishingConditions = () => {
    if (!fishingAlert) return { text: 'Loading...', color: '#E0E0E0' };
    return {
      text: fishingAlert.advice,
      color: fishingAlert.safe ? '#6BFF8A' : '#FF6B6B',
    };
  };

  const fishingConditions = getFishingConditions();
  const weatherData = fishingAlert?.data?.weather;
  const marineData = fishingAlert?.data?.marine;

  return (
    <ImageBackground source={require('../assets/weatherbg.png')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.scrollView, { paddingTop: headerHeight + 16 }]}
        >
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => navigation.navigate('SOS')}
          >
            <Text style={styles.sosText}>Emergency SOS</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 50 }}/>
          ) : errorMsg ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMsg}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={loadData}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : fishingAlert && weatherData && marineData ? (
            <>
              <View style={styles.weatherContainer}>
                <View style={styles.timeRow}>
                  <Text style={styles.dateText}>{currentTime.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}</Text>
                  <TouchableOpacity onPress={loadData}>
                    <Text style={styles.refreshIcon}>⟲</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.timeText}>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>{address || 'Loading...'}</Text>
                  <Text style={styles.lastUpdateText}>Last Update: {fishingAlert.time.split(' ')[1]} Hrs</Text>
                </View>

                <Text style={styles.temperature}>{Math.round(weatherData.temperature_2m)}°</Text>
                <Text style={styles.weatherDescription}>{getWeatherDescription(weatherData.weather_code)}</Text>
                <Text style={styles.windSpeed}>Wind Speed: {weatherData.wind_speed_10m}km/h</Text>
                
                <View style={styles.weatherStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Feels Like</Text>
                    <Text style={styles.statValue}>{Math.round(weatherData.apparent_temperature)}°C</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Humidity</Text>
                    <Text style={styles.statValue}>{weatherData.relative_humidity_2m}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Chance of Rain</Text>
                    <Text style={styles.statValue}>{weatherData.precipitation_probability}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Pressure</Text>
                    <Text style={styles.statValue}>{Math.round(weatherData.pressure_msl)}mbar</Text>
                  </View>
                </View>
              </View>

              <View style={styles.oceanContainer}>
                <Text style={styles.oceanTitle}>Ocean Conditions</Text>
                <View style={styles.oceanStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Wave Height</Text>
                    <Text style={styles.statValue}>{(marineData.wave_height ?? '--')}m</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Wave Direction</Text>
                    <Text style={styles.statValue}>{(marineData.wave_direction ?? '--')}°</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Wind Wave Period</Text>
                    <Text style={styles.statValue}>{(marineData.wind_wave_period ?? '--')}s</Text>
                  </View>
                </View>
                <View style={styles.fishingBar}>
                  <View style={[styles.fishingIndicator, { width: `${100 - fishingAlert.risk_probability}%`, backgroundColor: fishingConditions.color }]} />
                </View>
                <Text style={[styles.fishingText, { color: fishingConditions.color }]}>{fishingConditions.text}</Text>
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Extra padding for tab bar
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  refreshIcon: {
    fontSize: 24,
    color: '#E0E0E0',
  },
  timeText: {
    color: '#E0E0E0',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  locationContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },
  lastUpdateText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 4,
  },
  temperature: {
    color: '#FFFFFF',
    fontSize: 120,
    fontWeight: '200',
    marginTop: 8,
  },
  weatherDescription: {
    color: '#E0E0E0',
    fontSize: 18,
    marginTop: -10,
  },
  windSpeed: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 4,
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  oceanContainer: {
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  oceanBg: {
    opacity: 0.2,
  },
  oceanTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  oceanStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  fishingBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    width: '100%',
    marginTop: 8,
  },
  fishingIndicator: {
    height: 4,
    borderRadius: 2,
  },
  fishingText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    alignSelf: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default HomeScreen;
