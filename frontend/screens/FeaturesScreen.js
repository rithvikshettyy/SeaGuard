import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../constants/colors';
import { Env } from '../constants/env';

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
  const newsListRef = useRef(null);

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
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (news.length === 0) {
      return <Text style={styles.errorText}>No news available at the moment.</Text>;
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
        <TouchableOpacity>
          <Ionicons name="language-outline" size={32} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Chat Assistant Card */}
      <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
        <View style={[styles.card, styles.chatCard]}>
          <View style={styles.chatTextContainer}>
            <Text style={styles.cardTitle}>Chat Assistant</Text>
            <Text style={styles.chatTitle}>Ask Seabot{showCursor ? '|' : ' '}</Text>
            <Text style={styles.chatSubtitle}>Our very own chatbot to help you with sea related queries.</Text>
          </View>
          <Image source={require('../assets/blob.gif')} style={[styles.gif, {}]} />
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.columnLeft}>
          {/* Geo-Fencing Status Card */}
          <View style={[styles.card, styles.geoCard, { marginHorizontal: 0, marginBottom: 10, }]}>
            <Text style={[styles.cardTitle, { color: '#FFFFFF' }]}>Geo-Fencing Status</Text>
            <Text style={styles.geoStatus}>SAFE</Text>
            <Text style={styles.geoDistance}>Nearest Geo-Fence: 20.5km away</Text>
          </View>
          <View style={[styles.card, { overflow: 'hidden', padding: 0, backgroundColor: 'black', height: 93, marginHorizontal: 0, marginBottom: 6, marginTop: -4}]}>
            <Image source={require('../assets/fish.gif')} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        {/* Fishing Hub Card */}
        <TouchableOpacity onPress={() => navigation.navigate('FishingOptimizationHub')} style={[styles.card, styles.fishingHubCard]}>
          <Text style={styles.cardTitle}>Fishing Optimizer</Text>
          <Image source={require('../assets/fishnet.png')} style={styles.fishingOptimizerImage} />
          <Text style={styles.fishingHubText}>Get personalized strategies for a better catch.</Text>
          <TouchableOpacity style={styles.optimizeButton} onPress={() => navigation.navigate('FishingOptimizationHub')}>
            <Text style={styles.optimizeButtonText}>Get Recommendations</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.twoCardRow}>
        {/* Identify Fish Species Card */}
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.cardTitle}>Identify Fish Species</Text>
          <View style={styles.identifyContent}>
            <View>
                <Ionicons name="fish-outline" size={50} color="#333" />
                <Text style={styles.identifyQuestionMark}>?</Text>
            </View>
            <Text style={styles.identifyDescription}>
              Know your catch — identify species with a single tap.
            </Text>
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* Catch Monitor Card */}
        <TouchableOpacity style={[styles.card, styles.halfCard]} onPress={() => navigation.navigate('CatchRecord')}>
          <Text style={styles.cardTitle}>Monitor catch volumes</Text>
          <View style={styles.catchVolumeContainer}>
            <Text style={styles.catchVolume}>59.1kg</Text>
            <Text style={styles.catchSubText}>8.6kg avg/outing</Text>
          </View>
          <View style={styles.catchLogButton}>
            <Text style={styles.catchLogButtonText}>View Catch Log</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Latest News Card */}
      <View style={[styles.card, styles.newsCard]}>
        <Text style={styles.cardTitle}>Latest News</Text>
        {renderNewsContent()}
      </View>
    </ScrollView>
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