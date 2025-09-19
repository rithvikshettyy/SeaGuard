import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { COLORS } from './constants/colors';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import PurposeOnboardingScreen from './screens/PurposeOnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import TripPlanningScreen from './screens/TripPlanningScreen';
import TrackerScreen from './screens/TrackerScreen';
import SOSScreen from './screens/SOSScreen';
import NewsScreen from './screens/NewsScreen';
import CatchRecordScreen from './screens/CatchRecordScreen';
import ProfileScreen from './screens/ProfileScreen';
import CompassScreen from './screens/CompassScreen';
import NoFishingZoneScreen from './screens/NoFishingZoneScreen';
import PotentialFishingZoneScreen from './screens/PotentialFishingZoneScreen';
import GpsNavigationScreen from './screens/GpsNavigationScreen';
import DisasterAlertScreen from './screens/DisasterAlertScreen';
import ImportantContactsScreen from './screens/ImportantContactsScreen';
import IBLAlertsScreen from './screens/IBLAlertsScreen';
import OtherServicesScreen from './screens/OtherServicesScreen';
import SeaSafetyLivelihoodScreen from './screens/SeaSafetyLivelihoodScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import MapsScreen from './screens/Maps';
import FeaturesScreen from './screens/FeaturesScreen';
import ChatScreen from './screens/ChatScreen';
import LanguagePicker from './components/LanguagePicker';
import FishingOptimizationHub from './screens/FishingOptimizationHub';
import FishingNetsGuide from './screens/FishingNetsGuide';
import FishingGears from './screens/FishingGears';
import BaitSelection from './screens/BaitSelection';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerTransparent: true,
        headerTitle: () => <Image source={require('./assets/logo.png')} style={{ width: 120, height: 40, resizeMode: 'contain' }} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <LanguagePicker />
            <TouchableOpacity onPress={() => navigation.navigate('Compass')} style={{ marginLeft: 15 }}>
              <Ionicons name="compass-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
    {/* Add other screens in HomeStack here if they need to be navigated to from HomeScreen */}
    <Stack.Screen name="Compass" component={CompassScreen} />
    <Stack.Screen name="SOS" component={SOSScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false, // We handle the label manually
      tabBarActiveTintColor: '#000', // Color for the active icon and text
      tabBarInactiveTintColor: '#FFF', // Color for the inactive icons
      tabBarStyle: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: '#1C1C1E',
        borderRadius: 35,
        height: 70,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      tabBarItemStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      tabBarIcon: ({ focused, color, size }) => {
        const routeNameToLabel = {
          'HomeTab': 'Home',
          'Maps': 'Maps',
          'Features': 'Features',
          'Profile': 'Profile',
        }
        let iconName;
        if (route.name === 'HomeTab') {
          iconName = 'home';
        } else if (route.name === 'Maps') {
          iconName = 'map-outline';
        } else if (route.name === 'Features') {
          iconName = 'build-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }

        if (focused) {
          return (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 25,
              paddingVertical: 8,
              paddingHorizontal: 15,
            }}>
              <Ionicons name={iconName} size={22} color={color} />
              <Text style={{ color: color, marginLeft: 8, fontWeight: 'bold', fontSize: 14 }}>
                {routeNameToLabel[route.name]}
              </Text>
            </View>
          )
        }
        return <Ionicons name={iconName} size={26} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="Maps" component={MapsScreen} />
    <Tab.Screen name="Features" component={FeaturesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PurposeOnboarding" component={PurposeOnboardingScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      {/* Screens that should be available outside the tab bar but within the main stack */}
      <Stack.Screen name="TripPlanning" component={TripPlanningScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="CatchRecord" component={CatchRecordScreen} />
      <Stack.Screen name="NoFishingZone" component={NoFishingZoneScreen} />
      <Stack.Screen name="PotentialFishingZone" component={PotentialFishingZoneScreen} />
      <Stack.Screen name="GpsNavigation" component={GpsNavigationScreen} />
      <Stack.Screen name="DisasterAlert" component={DisasterAlertScreen} />
      <Stack.Screen name="ImportantContacts" component={ImportantContactsScreen} />
      <Stack.Screen name="IBLAlerts" component={IBLAlertsScreen} />
      <Stack.Screen name="OtherServices" component={OtherServicesScreen} />
      <Stack.Screen name="SeaSafetyLivelihood" component={SeaSafetyLivelihoodScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Tracker" component={TrackerScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="FishingOptimizationHub" component={FishingOptimizationHub} />
      <Stack.Screen name="FishingNetsGuide" component={FishingNetsGuide} />
      <Stack.Screen name="FishingGears" component={FishingGears} />
      <Stack.Screen name="BaitSelection" component={BaitSelection} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;