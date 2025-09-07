import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import * as Location from 'expo-location';
import { COLORS } from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const NEWS_API_KEY = 'aa70f66da1284be183ee26d5f604fcff';

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,pressure_msl,windspeed_10m`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setErrorMsg('Error fetching weather data');
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=fishing%20OR%20ocean&apiKey=${NEWS_API_KEY}`);
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error('Error fetching news data', error);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    if (location) {
      await fetchWeather(location.coords.latitude, location.coords.longitude);
    }
    await fetchNews();
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await fetchWeather(location.coords.latitude, location.coords.longitude);
      await fetchNews();
      setLoading(false);
    })();
  }, []);

  const getWeatherDescription = (code) => {
    switch (code) {
      case 0: return { desc: 'Clear sky', emoji: '☀️' };
      case 1:
      case 2:
      case 3: return { desc: 'Partly cloudy', emoji: '☁️' };
      case 45:
      case 48: return { desc: 'Fog', emoji: '🌫️' };
      case 51:
      case 53:
      case 55: return { desc: 'Drizzle', emoji: '💧' };
      case 56:
      case 57: return { desc: 'Freezing Drizzle', emoji: '💧❄️' };
      case 61:
      case 63:
      case 65: return { desc: 'Rain', emoji: '🌧️' };
      case 66:
      case 67: return { desc: 'Freezing Rain', emoji: '🌧️❄️' };
      case 71:
      case 73:
      case 75: return { desc: 'Snow fall', emoji: '❄️' };
      case 77: return { desc: 'Snow grains', emoji: '❄️' };
      case 80:
      case 81:
      case 82: return { desc: 'Rain showers', emoji: '🌦️' };
      case 85:
      case 86: return { desc: 'Snow showers', emoji: '🌨️' };
      case 95: return { desc: 'Thunderstorm', emoji: '⛈️' };
      case 96:
      case 99: return { desc: 'Thunderstorm with hail', emoji: '⛈️🧊' };
      default: return { desc: 'Unknown', emoji: '🤷' };
    }
  };

  return (
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
            <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
              <Text style={styles.refreshIcon}>⟲</Text>
            </TouchableOpacity>
          </View>

          {location ? (
            <>
              <View style={styles.coordinatesRow}>
                <View style={styles.coordinateGroup}>
                  <Text style={styles.coordinateLabel}>Latitude:</Text>
                  <Text style={styles.coordinateValue}>{location.coords.latitude.toFixed(8)}</Text>
                </View>
                <View style={styles.coordinateGroup}>
                  <Text style={styles.coordinateLabel}>Longitude:</Text>
                  <Text style={styles.coordinateValue}>{location.coords.longitude.toFixed(8)}</Text>
                </View>
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationDetail}>Last Update: {new Date(location.timestamp).toLocaleTimeString()}</Text>
                <Text style={styles.locationDetail}>Accuracy: +-{location.coords.accuracy.toFixed(0)}m</Text>
              </View>
            </>
          ) : (
            <Text>{errorMsg || 'Fetching location...'}</Text>
          )}
        </View>

        {/* Weather Section */}
        <View style={styles.weatherSection}>
          <Text style={styles.weatherTitle}>Weather Conditions</Text>

          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : weather ? (
            <>
              <View style={styles.weatherMainContainer}>
                <View style={styles.temperatureContainer}>
                  <Text style={styles.temperature}>{Math.round(weather.current_weather.temperature)}°</Text>
                  <View style={styles.cloudIcon}>
                    <Text style={styles.cloudEmoji}>{getWeatherDescription(weather.current_weather.weathercode).emoji}</Text>
                  </View>
                </View>

                <View style={styles.weatherDetailsContainer}>
                  <Text style={styles.weatherDescription}>{getWeatherDescription(weather.current_weather.weathercode).desc}</Text>
                  <Text style={styles.windSpeed}>Wind Speed: {weather.current_weather.windspeed}km/h</Text>
                </View>
              </View>

              <View style={styles.weatherStatsRow}>
                <View style={styles.weatherStat}>
                  <Text style={styles.statLabel}>Feels Like</Text>
                  <Text style={styles.statValue}>{Math.round(weather.hourly.apparent_temperature[0])}°C</Text>
                </View>
                <View style={styles.weatherStat}>
                  <Text style={styles.statLabel}>Humidity</Text>
                  <Text style={styles.statValue}>{weather.hourly.relativehumidity_2m[0]}%</Text>
                </View>
                <View style={styles.weatherStat}>
                  <Text style={styles.statLabel}>Chance of Rain</Text>
                  <Text style={styles.statValue}>{weather.hourly.precipitation_probability[0]}%</Text>
                </View>
                <View style={styles.weatherStat}>
                  <Text style={styles.statLabel}>Pressure</Text>
                  <Text style={styles.statValue}>{Math.round(weather.hourly.pressure_msl[0])}mbar</Text>
                </View>
              </View>
            </>
          ) : (
            <Text>{errorMsg || 'No weather data'}</Text>
          )}
        </View>

        {/* Updates Section */}
        <View style={styles.updatesContainer}>
          <View style={styles.updatesHeader}>
            <Text style={styles.updatesIcon}>📊</Text>
            <Text style={styles.updatesTitle}>Updates</Text>
          </View>

          <View style={styles.updatesList}>
            {news.slice(0, 2).map((item, index) => (
              <TouchableOpacity key={index} style={styles.updateItem} onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.updateBullet}>•</Text>
                <Text style={styles.updateText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.viewMoreContainer} onPress={() => navigation.navigate('NewsScreen', { articles: news })}>
            <Text style={styles.viewMoreText}>View More ∨</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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