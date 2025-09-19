import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, LayoutAnimation, UIManager, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fishInfo from '../assets/fishinfo.json';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FishingOptimizationHub = ({ navigation }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [fishingStyle, setFishingStyle] = useState('');
  const [targetFish, setTargetFish] = useState('');
  const [location, setLocation] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showFishDropdown, setShowFishDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const { fishingStyles, targetFish: targetFishData, locations: locationsData, recommendations: recommendationList } = fishInfo.fishingRecommendations;

  const getRecommendations = () => {
    const foundRec = recommendationList.find(rec =>
        rec.fishingStyle.toLowerCase() === fishingStyle.toLowerCase().trim() &&
        rec.targetFish.toLowerCase() === targetFish.toLowerCase().trim() &&
        rec.location.toLowerCase() === location.toLowerCase().trim()
    );

    if (foundRec) {
        setRecommendations(foundRec.recommendation);
    } else {
        setRecommendations(undefined);
    }
    setExpandedItem(null);
  };

  const defaultOptions = [
    {
      title: 'Fishing Nets Guide',
      icon: 'boat-outline',
      color: '#34C759',
      content: 'Detailed guide on various fishing nets, their uses, and best practices. This includes information on gill nets, trawl nets, and more.'
    },
    {
      title: 'Fishing Gears & Equipment',
      icon: 'hammer-outline',
      color: '#FF9500',
      content: 'Information on rods, reels, lines, hooks, and other essential fishing gear. Learn how to choose, use, and maintain your equipment.'
    },
    {
      title: 'Bait Types & Selection',
      icon: 'fish-outline',
      color: '#007AFF',
      content: 'A comprehensive guide to selecting the right bait for different fish species and conditions. Covers live bait, artificial lures, and seasonal tips.'
    },
  ];

  const recommendationOptions = recommendations ? [
    {
      title: 'Recommended Nets',
      icon: 'boat-outline',
      color: '#34C759',
      content: `Nets: ${recommendations.nets.join(', ')}\nDepth: ${recommendations.depth}\nSeason: ${recommendations.season}`
    },
    {
      title: 'Recommended Equipment',
      icon: 'hammer-outline',
      color: '#FF9500',
      content: `Equipment: ${recommendations.equipment.join(', ')}\nVessel Size: ${recommendations.vesselSize}`
    },
    {
      title: 'Recommended Bait',
      icon: 'fish-outline',
      color: '#007AFF',
      content: `Bait: ${recommendations.bait.join(', ')}`
    },
    {
        title: 'Tips & Guidelines',
        icon: 'book-outline',
        color: '#5856D6',
        content: `Best Time: ${recommendations.bestTime}\n\nTips:\n- ${recommendations.tips.join('\n- ')}`
    }
  ] : [];

  const options = recommendations ? recommendationOptions : defaultOptions;

  const handlePress = (title) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItem(expandedItem === title ? null : title);
  };

  const renderItem = ({ item }) => {
    const isDefaultItem = defaultOptions.some(defaultItem => defaultItem.title === item.title);
    const isExpanded = isDefaultItem || item.title === expandedItem;

    return (
      <View style={styles.itemWrapper}>
        {isDefaultItem ? (
          <View style={styles.itemContainer}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={22} color="white" />
            </View>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item.title)} activeOpacity={0.8}>
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={22} color="white" />
              </View>
              <Text style={styles.itemText}>{item.title}</Text>
              <Ionicons name={isExpanded ? "chevron-down" : "chevron-forward"} size={22} color="#888888" />
          </TouchableOpacity>
        )}
        {isExpanded && (
            <View style={styles.expandedContent}>
                <Text style={styles.contentText}>{item.content}</Text>
            </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fishing Optimization Hub</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.recommendationForm}>
            <Text style={styles.formTitle}>Get Personalized Recommendations</Text>
            
            <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.input} onPress={() => setShowStyleDropdown(!showStyleDropdown)}>
                    <Text style={styles.dropdownText}>{fishingStyle ? fishingStyles[fishingStyle]?.name : 'Select Fishing Style'}</Text>
                    <Ionicons name={showStyleDropdown ? "chevron-up" : "chevron-down"} size={22} color="#C7C7CC" />
                </TouchableOpacity>
                {showStyleDropdown && (
                    <View style={styles.dropdown}>
                        {Object.keys(fishingStyles).map(style => (
                            <TouchableOpacity key={style} style={styles.dropdownItem} onPress={() => {
                                setFishingStyle(style);
                                setShowStyleDropdown(false);
                            }}>
                                <Text style={styles.dropdownItemText}>{fishingStyles[style].name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.input} onPress={() => setShowFishDropdown(!showFishDropdown)}>
                    <Text style={styles.dropdownText}>{targetFish ? targetFishData[targetFish]?.name : 'Select Target Fish'}</Text>
                    <Ionicons name={showFishDropdown ? "chevron-up" : "chevron-down"} size={22} color="#C7C7CC" />
                </TouchableOpacity>
                {showFishDropdown && (
                    <View style={styles.dropdown}>
                        {Object.keys(targetFishData).map(fish => (
                            <TouchableOpacity key={fish} style={styles.dropdownItem} onPress={() => {
                                setTargetFish(fish);
                                setShowFishDropdown(false);
                            }}>
                                <Text style={styles.dropdownItemText}>{targetFishData[fish].name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.input} onPress={() => setShowLocationDropdown(!showLocationDropdown)}>
                    <Text style={styles.dropdownText}>{location ? locationsData[location]?.name : 'Select Location'}</Text>
                    <Ionicons name={showLocationDropdown ? "chevron-up" : "chevron-down"} size={22} color="#C7C7CC" />
                </TouchableOpacity>
                {showLocationDropdown && (
                    <View style={styles.dropdown}>
                        {Object.keys(locationsData).map(loc => (
                            <TouchableOpacity key={loc} style={styles.dropdownItem} onPress={() => {
                                setLocation(loc);
                                setShowLocationDropdown(false);
                            }}>
                                <Text style={styles.dropdownItemText}>{locationsData[loc].name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={getRecommendations}>
                <Text style={styles.buttonText}>Get Recommendations</Text>
            </TouchableOpacity>
        </View>

        {recommendations === null && <FlatList
            data={defaultOptions}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            style={styles.list}
            extraData={expandedItem}
        />}

        {recommendations && <FlatList
            data={recommendationOptions}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            style={styles.list}
            extraData={expandedItem}
        />}
        
        {recommendations === undefined && <View style={styles.noResult}><Text style={styles.noResultText}>No recommendations found for your selection.</Text></View>}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Light background for a sleek look
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF', // Light header
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333', // Dark text for light background
  },
  recommendationForm: {
    padding: 20,
    margin: 15,
    borderRadius: 15,
    backgroundColor: '#FFFFFF', // Light background
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333333', // Dark text
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#E8E8E8', // Lighter input field
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333333', // Dark text
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC', // Lighter border
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333', // Dark text
  },
  dropdown: {
    backgroundColor: '#FFFFFF', // Light background
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    elevation: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE', // Lighter border
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333333', // Dark text
  },
  button: {
    backgroundColor: '#002845', // Specified button color
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#002845',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  list: {
    marginTop: 20,
  },
  itemWrapper: {
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF', // Light background
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: '#333333', // Dark text
    fontWeight: '600',
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  contentText: {
    fontSize: 15,
    color: '#555555', // Darker grey for better readability
    lineHeight: 24,
  },
  noResult: {
    alignItems: 'center',
    marginTop: 30,
  },
  noResultText: {
    color: '#555555',
    fontSize: 16,
    fontStyle: 'italic',
  }
});

export default FishingOptimizationHub;