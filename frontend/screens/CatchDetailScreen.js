import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const CatchDetailScreen = ({ navigation, route }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '',
    fishType: '',
    weightRange: '',
    location: ''
  });
  // Get data from navigation params, or use static data for now
  const { item } = route.params || {
    date: 'September 8, 2025',
    time: '8:30 AM',
    weight: '45.1kg',
    fishType: 'Pomfret',
    location: '12.2502° N, 64.3372° E',
    image: require('../assets/pomfretbg.png'),
    media: [
      { id: 1, source: require('../assets/fisherman.png') },
      { id: 2, source: require('../assets/image.png') },
      { id: 3, source: require('../assets/fish.gif') },
      { id: 4, source: require('../assets/fish.gif') },
      { id: 5, source: require('../assets/fish.gif') },
    ],
    description: 'Caught near the oil rig. Weather was clear. Water was unusually clear, saw a whole school passing by.',
    locationName: 'Arabian Sea',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Back</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="options-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Catches</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterForm}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Date Range</Text>
                <TextInput
                  style={styles.filterInput}
                  placeholder="e.g., Last 7 days"
                  value={filters.dateRange}
                  onChangeText={(text) => setFilters({...filters, dateRange: text})}
                />
              </View>

              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Fish Type</Text>
                <TextInput
                  style={styles.filterInput}
                  placeholder="e.g., Pomfret, Mackerel"
                  value={filters.fishType}
                  onChangeText={(text) => setFilters({...filters, fishType: text})}
                />
              </View>

              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Weight Range</Text>
                <TextInput
                  style={styles.filterInput}
                  placeholder="e.g., 30-50 kg"
                  value={filters.weightRange}
                  onChangeText={(text) => setFilters({...filters, weightRange: text})}
                />
              </View>

              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Location</Text>
                <TextInput
                  style={styles.filterInput}
                  placeholder="e.g., Arabian Sea"
                  value={filters.location}
                  onChangeText={(text) => setFilters({...filters, location: text})}
                />
              </View>

              <View style={styles.filterButtons}>
                <TouchableOpacity 
                  style={[styles.filterButton, styles.resetButton]}
                  onPress={() => {
                    setFilters({
                      dateRange: '',
                      fishType: '',
                      weightRange: '',
                      location: ''
                    });
                  }}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.filterButton, styles.applyButton]}
                  onPress={() => {
                    // Apply filters logic here
                    setFilterModalVisible(false);
                  }}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollViewContent}>
        {/* Date & Time */}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.text} />
        </View>

        {/* Main Fish Card */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('PomfretDetailScreen', { item })}
        >
          <ImageBackground source={item.image} style={styles.mainFishCardBackground} imageStyle={styles.mainFishCardImageStyle}>
            <View style={styles.mainFishCardContent}>
              <Text style={styles.mainFishWeight}>{item.weight}</Text>
              <Text style={styles.mainFishLocation}>{item.location}</Text>
              <Text style={styles.mainFishType}>{item.fishType}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Media & Location */}
        <Text style={styles.sectionTitle}>Media & Location</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaGallery}>
          {item.media.map((mediaItem, index) => (
            <View key={mediaItem.id} style={styles.mediaItemContainer}>
              <Image source={mediaItem.source} style={styles.mediaImage} contentFit="cover" />
              {index === 3 && (
                <View style={styles.mediaOverlay}>
                  <Text style={styles.mediaOverlayText}>+2</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <Text style={styles.locationName}>{item.locationName} ({item.location})</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </ScrollView>

      {/* Floating Edit Button */}
      <TouchableOpacity style={styles.editFab}>
        <Ionicons name="pencil-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF1',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filterForm: {
    marginTop: 15,
  },
  filterItem: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5,
    fontWeight: '500',
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
  },
  applyButton: {
    backgroundColor: COLORS.primary || '#183050',
  },
  resetButtonText: {
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  applyButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#183050',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.text,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  mainFishCardBackground: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
  },
  mainFishCardImageStyle: {
    resizeMode: 'cover',
  },
  mainFishCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mainFishWeight: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mainFishLocation: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  mainFishType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  mediaGallery: {
    marginBottom: 20,
  },
  mediaItemContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  mediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaOverlayText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.lightText,
    lineHeight: 20,
  },
  editFab: {
    position: 'absolute',
    bottom: 100, // Above bottom nav bar
    right: 20,
    backgroundColor: '#183050',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CatchDetailScreen;
