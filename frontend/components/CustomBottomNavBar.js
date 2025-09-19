import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomBottomNavBar = ({ state, descriptors, navigation }) => {
  const [activeTab, setActiveTab] = useState(state.routes[state.index].name);

  const tabs = [
    { name: 'HomeTab', label: 'Home', icon: 'home' },
    { name: 'Maps', label: 'Map', icon: 'map' },
    { name: 'Features', label: 'Features', icon: 'wrench' },
    { name: 'Profile', label: 'Profile', icon: 'person' },
  ];

  const onTabPress = (routeName) => {
    setActiveTab(routeName);
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
          >
            <View style={[styles.tabContent, isActive && styles.activeTab]}>
              <Ionicons
                name={tab.icon}
                size={24}
                color={isActive ? '#000' : '#fff'}
              />
              {isActive && <Text style={styles.label}>{tab.label}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#000',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default CustomBottomNavBar;
