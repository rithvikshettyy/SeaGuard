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
    const isExpanded = item.title === expandedItem;
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item.title)} activeOpacity={0.8}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={22} color="white" />
            </View>
            <Text style={styles.itemText}>{item.title}</Text>
            <Ionicons name={isExpanded ? "chevron-down" : "chevron-forward"} size={22} color="#C7C7CC" />
        </TouchableOpacity>
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
          <Ionicons name="arrow-back" size={24} color="white" />
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
        
        {recommendations === undefined && <View style={styles.noResult}><Text style={{color: 'white'}}>No recommendations found for your selection.</Text></View>}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#1C1C1E',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  recommendationForm: {
    padding: 20,
    margin: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'white',
  },
  dropdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    marginTop: 10,
  },
  itemWrapper: {
    marginHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 15,
    color: '#E5E5EA',
    lineHeight: 22,
  },
  noResult: {
    alignItems: 'center',
    marginTop: 20,
  }
});

export default FishingOptimizationHub;