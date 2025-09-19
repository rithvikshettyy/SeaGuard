import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width - 40;
const TAB_WIDTH = TAB_BAR_WIDTH / 4;

const getIconName = (routeName) => {
  switch (routeName) {
    case 'HomeTab':
      return 'home';
    case 'Maps':
      return 'map-outline';
    case 'Features':
      return 'build-outline';
    case 'Profile':
      return 'person-outline';
    default:
      return 'home';
  }
};

const AnimatedTabBar = ({ state, descriptors, navigation }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.activeTab, { transform: [{ translateX: slideAnimation }] }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={getIconName(route.name)}
              size={24}
              color={isFocused ? COLORS.black : COLORS.white}
            />
            {isFocused && (
              <Text style={styles.tabLabel}>{route.name === 'HomeTab' ? 'Home' : route.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 35,
    height: 70,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeTab: {
    position: 'absolute',
    top: 13,
    height: 45,
    width: TAB_WIDTH - 10, // Adjust width for padding
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  tabLabel: {
    color: COLORS.black,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AnimatedTabBar;
