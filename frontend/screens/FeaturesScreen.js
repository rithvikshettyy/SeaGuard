import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Modal} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/colors';
import { Env } from '../constants/env';
<<<<<<< Updated upstream
import { useLanguage } from '../contexts/LanguageContext';
import { screenTexts, getLanguageNames } from '../constants/screenTexts';
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import catchLogsData from '../constants/catchLogsData.json';
>>>>>>> Stashed changes

const BASE_URL = Env.BASE_URL;

const { width } = Dimensions.get('window');
const cardMargin = 15;
const cardWidth = width - (cardMargin * 2);


const FeaturesScreen = ({ navigation }) => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCursor, setShowCursor] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const newsListRef = useRef(null);
<<<<<<< Updated upstream
  const { language, changeLanguage } = useLanguage();

  const LANGUAGES = Object.entries(getLanguageNames()).map(([code, name]) => ({
    code,
    name
  }));

  const handleLanguageSelect = (languageCode) => {
    changeLanguage(languageCode);
    setModalVisible(false);
  };
=======
  const [catchLogs, setCatchLogs] = useState([]);
  const isFocused = useIsFocused();
>>>>>>> Stashed changes

  const handleUploadPress = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('GetPredictions', { imageUri: result.assets[0].uri });
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Replace with your actual backend IP address
        const response = await fetch(`${BASE_URL}/rss-feed?lat=${latitude}&lon=${longitude}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length > 0 && !loading) {
      const interval = setInterval(() => {
        const nextIndex = (activeNewsIndex + 1) % news.length;
        if (newsListRef.current) {
          newsListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [activeNewsIndex, news, loading]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const loadCatchLogs = async () => {
      try {
        const storedLogs = await AsyncStorage.getItem('catchLogs');
        if (storedLogs !== null) {
          setCatchLogs(JSON.parse(storedLogs));
        } else {
          setCatchLogs(catchLogsData);
          await AsyncStorage.setItem('catchLogs', JSON.stringify(catchLogsData));
        }
      } catch (error) {
        console.error('Error loading catch logs:', error);
      }
    };

    if (isFocused) {
        loadCatchLogs();
    }
  }, [isFocused]);

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

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveNewsIndex(Math.round(index));
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsItemTitle} numberOfLines={3}>{item.title}</Text>
      <Text style={styles.newsItemSnippet} numberOfLines={2}>{item.source}</Text>
    </View>
  );

  const renderNewsContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    if (error) {
      return <Text style={styles.errorText}>
        {screenTexts.FeaturesScreen[language].news.error.replace('{error}', error)}
      </Text>;
    }

    if (news.length === 0) {
      return <Text style={styles.errorText}>{screenTexts.FeaturesScreen[language].news.noNews}</Text>;
    }

    return (
      <>
        <FlatList
          ref={newsListRef}
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => item.link || index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
        <View style={styles.pagination}>
          {news.map((_, index) => (
            <View key={index} style={[styles.dot, activeNewsIndex === index ? styles.activeDot : {}]} />
          ))}
        </View>
      </>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      decelerationRate="fast"
      removeClippedSubviews={true}
    >
      <View style={styles.header}>
        <Image source={require('../assets/icon_black.png')} style={styles.logo} contentFit="contain" />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.languageButton}>
            <Text style={styles.languageButtonText}>
              🌐 {getLanguageNames()[language]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Chat Assistant Card */}
      <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
        <View style={[styles.card, styles.chatCard]}>
          <View style={styles.chatTextContainer}>
            <Text style={styles.cardTitle}>{screenTexts.FeaturesScreen[language].chatAssistant.title}</Text>
            <Text style={styles.chatTitle}>{screenTexts.FeaturesScreen[language].chatAssistant.heading}{showCursor ? '|' : ' '}</Text>
            <Text style={styles.chatSubtitle}>{screenTexts.FeaturesScreen[language].chatAssistant.subtitle}</Text>
          </View>
          <Image source={require('../assets/blob.gif')} style={[styles.gif, {}]} />
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.columnLeft}>
          {/* Geo-Fencing Status Card */}
          <View style={[styles.card, styles.geoCard, { marginHorizontal: 0, marginBottom: 10, }]}>
            <Text style={[styles.cardTitle, { color: '#FFFFFF' }]}>{screenTexts.FeaturesScreen[language].geoFencing.title}</Text>
            <Text style={styles.geoStatus}>{screenTexts.FeaturesScreen[language].geoFencing.status}</Text>
            <Text style={styles.geoDistance}>
              {screenTexts.FeaturesScreen[language].geoFencing.distance.replace('{distance}', '20.5')}
            </Text>
          </View>
          <View style={[styles.card, { overflow: 'hidden', padding: 0, backgroundColor: 'black', height: 93, marginHorizontal: 0, marginBottom: 6, marginTop: -4}]}>
            <Image source={require('../assets/fish.gif')} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        {/* Fishing Hub Card */}
        <TouchableOpacity onPress={() => navigation.navigate('FishingOptimizationHub')} style={[styles.card, styles.fishingHubCard]}>
          <Text style={styles.cardTitle}>{screenTexts.FeaturesScreen[language].fishingOptimizer.title}</Text>
          <Image source={require('../assets/fishnet.png')} style={styles.fishingOptimizerImage} />
          <Text style={styles.fishingHubText}>{screenTexts.FeaturesScreen[language].fishingOptimizer.description}</Text>
          <TouchableOpacity style={styles.optimizeButton} onPress={() => navigation.navigate('FishingOptimizationHub')}>
            <Text style={styles.optimizeButtonText}>{screenTexts.FeaturesScreen[language].fishingOptimizer.button}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.twoCardRow}>
        {/* Identify Fish Species Card */}
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.cardTitle}>{screenTexts.FeaturesScreen[language].fishIdentifier.title}</Text>
          <View style={styles.identifyContent}>
            <View>
                <Ionicons name="fish-outline" size={50} color="#333" />
                <Text style={styles.identifyQuestionMark}>?</Text>
            </View>
            <Text style={styles.identifyDescription}>
              {screenTexts.FeaturesScreen[language].fishIdentifier.description}
            </Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPress}>
            <Text style={styles.uploadButtonText}>{screenTexts.FeaturesScreen[language].fishIdentifier.button}</Text>
          </TouchableOpacity>
        </View>

        {/* Catch Monitor Card */}
        <TouchableOpacity style={[styles.card, styles.halfCard]} onPress={() => navigation.navigate('CatchRecord')}>
          <Text style={styles.cardTitle}>{screenTexts.FeaturesScreen[language].catchMonitor.title}</Text>
          <View style={styles.catchVolumeContainer}>
<<<<<<< Updated upstream
            <Text style={styles.catchVolume}>{screenTexts.FeaturesScreen[language].catchMonitor.volume.replace('{volume}', '59.1')}</Text>
            <Text style={styles.catchSubText}>{screenTexts.FeaturesScreen[language].catchMonitor.average.replace('{average}', '8.6')}</Text>
=======
            <Text style={styles.catchVolume}>{totalCatch}kg</Text>
            <Text style={styles.catchSubText}>Most common: {mostCommonFish}</Text>
>>>>>>> Stashed changes
          </View>
          <View style={styles.catchLogButton}>
            <Text style={styles.catchLogButtonText}>{screenTexts.FeaturesScreen[language].catchMonitor.button}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Latest News Card */}
      <View style={[styles.card, styles.newsCard]}>
        <Text style={styles.cardTitle}>{screenTexts.FeaturesScreen[language].news.title}</Text>
        {renderNewsContent()}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{screenTexts.FeaturesScreen[language].chooseLanguage}</Text>
            <FlatList
              data={LANGUAGES}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.languageItem}
                  onPress={() => handleLanguageSelect(item.code)}
                >
                  <Text style={styles.languageText}>{item.name}</Text>
                  {language === item.code && (
                    <Ionicons name="checkmark" size={24} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.code}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.primary,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  languageButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  languageButtonText: {
    fontSize: 14,
    color: COLORS.text,
  },
  container: {
    flex: 1,
    backgroundColor: '#E9EFF1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 150,
    height: 45,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: cardMargin,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 13,
    color: COLORS.lightText,
    marginBottom: 4,
    fontWeight: '700',
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
  },
  chatTextContainer: {
      flex: 1,
  },
  chatTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  chatSubtitle: {
    fontSize: 13,
    color: COLORS.lightText,
    marginTop: 4,
  },
  gif: {
    width: 140,
    height: 200,
    marginLeft: 0,
    marginBottom: -50,
    marginTop: -30,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: cardMargin,
  },
  columnLeft: {
    flex: 0.4,
    marginRight: 0,
    marginTop: 3,
  },
  geoCard: {
    backgroundColor: '#2E7D3F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    aspectRatio: 1 / 1.05,
    marginRight: -6,
    marginTop: -4,
  },
  geoStatus: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  geoDistance: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  fishingHubCard: {
    flex: 0.6,
    marginRight: 0,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 6,
    aspectRatio: 1,
  },
  fishingOptimizerImage: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  fishingHubText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.lightText,
    textAlign: 'center',
    marginBottom: 1,
    marginTop: 10,
  },
  optimizeButton: {
    backgroundColor: '#0A2540',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    alignItems: 'center',
  },
  optimizeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  twoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: cardMargin,
    marginBottom: 4,
  },
  halfCard: {
    width: '49.1%',
    marginHorizontal: 0,
  },
  identifyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  identifyQuestionMark: {
    position: 'absolute',
    top: 0,
    right: -15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  identifyDescription: {
    fontSize: 12,
    color: COLORS.lightText,
    textAlign: 'center',
    marginTop: 8,
  },
  uploadButton: {
    backgroundColor: '#0A2540',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: '10',
    marginBottom: -10,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  catchVolumeContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  catchVolume: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingTop: 30,
  },
  catchSubText: {
    fontSize: 12,
    color: COLORS.lightText,
    marginTop: 4,
  },
  catchLogButton: {
    backgroundColor: '#0A2540',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 37,
    marginBottom: -10,
  },
  catchLogButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  newsCard: {
    height: 200,
  },
  newsItem: {
    width: cardWidth - 40,
    paddingRight: 20, // To avoid text touching the edge
  },

  newsItemTextContainer: {
    flex: 1,
    paddingRight: 120, // Space for the image
  },
  newsItemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  newsItemSnippet: {
    fontSize: 14,
    color: COLORS.lightText,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.lightText,
  },
});

export default FeaturesScreen;