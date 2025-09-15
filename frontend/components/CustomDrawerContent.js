import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>SeaGuard</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="No Fishing Zone"
        onPress={() => navigation.navigate('NoFishingZone')}
        icon={({ color, size }) => <Ionicons name="boat-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Potential Fishing Zone"
        onPress={() => navigation.navigate('PotentialFishingZone')}
        icon={({ color, size }) => <Ionicons name="fish-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="GPS and Navigation"
        onPress={() => navigation.navigate('GpsNavigation')}
        icon={({ color, size }) => <Ionicons name="navigate-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Disaster Alert"
        onPress={() => navigation.navigate('DisasterAlert')}
        icon={({ color, size }) => <Ionicons name="warning-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Important Contacts"
        onPress={() => navigation.navigate('ImportantContacts')}
        icon={({ color, size }) => <Ionicons name="call-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="IBL Alerts"
        onPress={() => navigation.navigate('IBLAlerts')}
        icon={({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Other Services"
        onPress={() => navigation.navigate('OtherServices')}
        icon={({ color, size }) => <Ionicons name="apps-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Sea Safety and Livelihood"
        onPress={() => navigation.navigate('SeaSafetyLivelihood')}
        icon={({ color, size }) => <Ionicons name="shield-checkmark-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
        icon={({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="About"
        onPress={() => navigation.navigate('About')}
        icon={({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: COLORS.primary,
    padding: 20,
    alignItems: 'center',
  },
  drawerHeaderText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
