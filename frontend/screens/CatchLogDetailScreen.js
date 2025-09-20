import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const CatchLogDetailScreen = ({ navigation, route }) => {
  const { catchLog } = route.params; // Assuming catchLog object is passed via navigation params

  // Dummy media for demonstration, replace with actual media from catchLog
  const media = [
    require('../assets/fisherman.png'),
    require('../assets/oceanbg.png'),
    require('../assets/fish1.png'),
    require('../assets/fish2.png'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Back</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {/* Date & Time */}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.timeText}>{catchLog.time}</Text>
          <Text style={styles.dateText}>{catchLog.date}</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.lightText} />
        </View>

        {/* Main Catch Card */}
        <ImageBackground
          source={catchLog.image} // Use the image from catchLog
          style={styles.mainCatchCard}
          imageStyle={styles.mainCatchCardImageStyle}
        >
          <Text style={styles.mainCatchWeight}>{catchLog.weight}</Text>
          <View style={styles.mainCatchDetails}>
            <Text style={styles.mainCatchLocation}>{catchLog.location}</Text>
            <Text style={styles.mainCatchFishType}>{catchLog.fishType}</Text>
          </View>
        </ImageBackground>

        {/* Media & Location Section */}
        <Text style={styles.sectionTitle}>Media & Location</Text>
        <View style={styles.mediaContainer}>
          {media.slice(0, 3).map((img, index) => (
            <Image key={index} source={img} style={styles.mediaThumbnail} />
          ))}
          {media.length > 3 && (
            <View style={styles.moreMediaOverlay}>
              <Text style={styles.moreMediaText}>+{media.length - 3}</Text>
            </View>
          )}
        </View>

        {/* Description/Notes */}
        <Text style={styles.sectionTitle}>Arabian Sea <Text style={styles.locationCoords}>({catchLog.location})</Text></Text>
        <Text style={styles.descriptionText}>
          Caught near the oil rig. Weather was clear. Water was unusually clear, saw a whole school passing by.
        </Text>
      </ScrollView>

      {/* Floating Edit Button */}
      <TouchableOpacity style={styles.editFab}>
        <Ionicons name="pencil" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#0A2540',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    marginLeft: 10,
  },
  mainCatchCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'space-between',
    padding: 15,
  },
  mainCatchCardImageStyle: {
    resizeMode: 'cover',
  },
  mainCatchWeight: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mainCatchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mainCatchLocation: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  mainCatchFishType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  locationCoords: {
    fontSize: 14,
    fontWeight: 'normal',
    color: COLORS.lightText,
  },
  mediaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  mediaThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  moreMediaOverlay: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreMediaText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  editFab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#0A2540',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CatchLogDetailScreen;
