import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const CustomBottomTabBar = ({ state, descriptors, navigation }) => {
  const [activeTab, setActiveTab] = useState(state.routes[state.index].name);

  const tabs = [
    { name: 'HomeTab', label: 'Home', icon: 'home-outline' },
    { name: 'Maps', label: 'Map', icon: 'map-outline' },
    { name: 'Features', label: 'Features', icon: 'build-outline' },
    { name: 'Profile', label: 'Profile', icon: 'person-outline' },
  ];

  const onTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab.name)}
          >
            <Ionicons name={tab.icon} size={24} color={isActive ? '#000' : '#fff'} />
            {isActive && <Text style={styles.tabLabel}>{tab.label}</Text>}
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
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  tabLabel: {
    color: '#000',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default CustomBottomTabBar;
