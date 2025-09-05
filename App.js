import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './constants/colors';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TripPlanningScreen from './screens/TripPlanningScreen';
import HeatmapScreen from './screens/HeatmapScreen';
import TrackerScreen from './screens/TrackerScreen';
import SOSScreen from './screens/SOSScreen';
import NewsScreen from './screens/NewsScreen';
import CatchRecordScreen from './screens/CatchRecordScreen';
import ProfileScreen from './screens/ProfileScreen';
import CompassScreen from './screens/CompassScreen';
import HamburgerMenu from './components/HamburgerMenu';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerRight: () => <HamburgerMenu navigation={navigation} />,
      })}
    />
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
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
      tabBarStyle: { backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.lightText,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Heatmap') {
          iconName = focused ? 'map' : 'map-outline';
        } else if (route.name === 'Compass') {
          iconName = focused ? 'compass' : 'compass-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeTab" options={{ title: 'Home', headerShown: false }}>
      {(props) => <HomeStack {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Heatmap" component={HeatmapScreen} />
    <Tab.Screen name="Compass" component={CompassScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;