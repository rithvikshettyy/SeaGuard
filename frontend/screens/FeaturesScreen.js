import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const marketplaceData = [
  {
    id: '1',
    name: 'DECATHLON CAPERLAN Fishing Rod Combo Resifight 100 Compact Unisex 8Ft',
    price: '₹1,999',
    rating: 4.2,
    image: require('../assets/banner1.png'),
  },
  {
    id: '2',
    name: 'Another Fishing Rod',
    price: '₹2,499',
    rating: 4.5,
    image: require('../assets/banner2.png'),
  },
];

const newsData = [
  {
    id: '1',
    title: 'Chance of High Tides on Mumbai Coast -TOI',
    snippet: 'Mumbai, Sept 17 (TOI) — The India Meteorological Department (IMD) has issued an advisory warning of unusually high tides expected along the Mumbai coastline...',
    image: require('../assets/banner3.png'),
  },
  {
    id: '2',
    title: 'New Fishing Regulations Announced',
    snippet: 'The government has announced new fishing regulations to protect marine life...',
    image: require('../assets/banner4.png'),
  },
    {
    id: '3',
    title: 'Local Fisherman Catches Record-Breaking Fish',
    snippet: 'A local fisherman from the area has caught a record-breaking fish, making headlines...',
    image: require('../assets/banner1.png'),
  },
];

const { width } = Dimensions.get('window');
const cardMargin = 15;
const cardWidth = width - (cardMargin * 2);

const FeaturesScreen = ({ navigation }) => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const newsListRef = useRef(null);

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveNewsIndex(Math.round(index));
  };

  const renderMarketplaceItem = ({ item }) => (
    <View style={styles.marketplaceItem}>
      <Image source={item.image} style={styles.marketplaceItemImage} contentFit="cover" />
      <Text style={styles.marketplaceItemName} numberOfLines={3}>{item.name}</Text>
      <View style={styles.priceRatingContainer}>
        <Text style={styles.marketplaceItemPrice}>{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" color="#FFC107" size={14} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.visitButton}>
        <Text style={styles.visitButtonText}>Visit website</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
        <Text style={styles.newsItemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.newsItemSnippet} numberOfLines={4}>{item.snippet}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} contentFit="contain" />
        <TouchableOpacity>
          <Ionicons name="language-outline" size={32} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Chat Assistant Card */}
      <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
        <View style={[styles.card, styles.chatCard]}>
          <View style={styles.chatTextContainer}>
            <Text style={styles.cardTitle}>Chat Assistant</Text>
            <Text style={styles.chatTitle}>Ask Seabot</Text>
            <Text style={styles.chatSubtitle}>our very own chatbot to help you with sea related queries</Text>
          </View>
          <Image source={require('../assets/blob.gif')} style={[styles.gif, {}]} />
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.columnLeft}>
          {/* Geo-Fencing Status Card */}
          <View style={[styles.card, styles.geoCard, { marginHorizontal: 0, marginBottom: 10, }]}>
            <Text style={styles.cardTitle}>Geo-Fencing Status</Text>
            <Text style={styles.geoStatus}>SAFE</Text>
            <Text style={styles.geoDistance}>Nearest Geo-Fence: 20.5km away</Text>
          </View>
          <View style={[styles.card, { overflow: 'hidden', padding: 0, backgroundColor: 'black', height: 100, marginHorizontal: 0, marginBottom: 15 }]}>
            <Image source={require('../assets/fish.gif')} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        {/* Marketplace Card */}
        <View style={[styles.card, styles.marketplaceCard]}>
          <Text style={styles.cardTitle}>Marketplace</Text>
          <View style={styles.tabs}>
            {['Rods', 'Fishing Nets', 'Lures', 'Boats', '+3'].map(tab => (
              <TouchableOpacity key={tab} style={[styles.tab, tab === 'Rods' && styles.activeTab]}>
                <Text style={[styles.tabText, tab === 'Rods' && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            data={marketplaceData}
            renderItem={renderMarketplaceItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>
      </View>

      {/* Catch Monitor Card */}
      <View style={[styles.card, styles.catchMonitorCard]}>
        <View>
          <Text style={styles.cardTitle}>Monitor catch volumes</Text>
          <Text style={styles.catchMonitorText}>Today:</Text>
          <Text style={styles.catchMonitorText}>Monthly Avg:</Text>
          <Text style={styles.catchMonitorText}>Trend:</Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>69%</Text>
          <Text style={styles.progressSubText}>280kg/500kg</Text>
        </View>
      </View>

      {/* Latest News Card */}
      <View style={[styles.card, styles.newsCard]}>
        <Text style={styles.cardTitle}>Latest News</Text>
        <FlatList
          ref={newsListRef}
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
        <View style={styles.pagination}>
          {newsData.map((_, index) => (
            <View key={index} style={[styles.dot, activeNewsIndex === index ? styles.activeDot : {}]} />
          ))}
        </View>
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
    borderRadius: 5,
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
    width: 170,
    height: 170,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: cardMargin,
  },
  columnLeft: {
    flex: 0.4,
    marginRight: 15,
  },
  geoCard: {
    backgroundColor: '#DCEFE3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  geoStatus: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3E5A4F',
    marginVertical: 4,
  },
  geoDistance: {
    fontSize: 13,
    color: '#3E5A4F',
    textAlign: 'center',
  },
  marketplaceCard: {
    flex: 0.6,
    margin: 0,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F0F2F5',
    marginRight: 8,
    marginBottom: 8,
  },
  activeTab: {
    backgroundColor: '#009688',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  activeTabText: {
    color: '#FFF',
  },
  marketplaceItem: {
    width: 140,
    marginRight: 15,
  },
  marketplaceItemImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  marketplaceItemName: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    height: 40, // For 3 lines
  },
  priceRatingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
  },
  marketplaceItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: COLORS.lightText,
  },
  visitButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  visitButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  catchMonitorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catchMonitorText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: '#E0E0E0',
    borderTopColor: '#009688',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  progressSubText: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  newsCard: {
    height: 200,
  },
  newsItem: {
    width: cardWidth,
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
});

export default FeaturesScreen;