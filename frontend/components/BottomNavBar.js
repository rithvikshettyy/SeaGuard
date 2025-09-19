import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Map', icon: 'map' },
    { name: 'Features', icon: 'layers' },
    { name: 'Profile', icon: 'account' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => setActiveTab(tab.name)}
        >
          <View style={[styles.tabContent, activeTab === tab.name && styles.activeTab]}>
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              color={activeTab === tab.name ? '#000' : '#fff'}
            />
            {activeTab === tab.name && <Text style={styles.label}>{tab.name}</Text>}
          </View>
        </TouchableOpacity>
      ))}
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

export default BottomNavBar;