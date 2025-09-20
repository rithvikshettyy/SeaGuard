import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from './constants/colors';
import { useFonts, InstrumentSans_400Regular, InstrumentSans_700Bold } from '@expo-google-fonts/instrument-sans';
import { LanguageProvider } from './contexts/LanguageContext';

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
import LogNewCatchScreen from './screens/LogNewCatchScreen';
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
import AnimatedTabBar from './components/AnimatedTabBar';
import GetPredictionsScreen from './screens/GetPredictions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Global font setup
const regularFont = 'InstrumentSans_400Regular';
const boldFont = 'InstrumentSans_700Bold';

const oldRender = Text.render;
Text.render = function(...args) {
  const origin = oldRender.call(this, ...args);
  const styles = StyleSheet.flatten(origin.props.style);
  
  const fontFamily = (styles && (styles.fontWeight === 'bold' || styles.fontWeight >= '700')) ? boldFont : regularFont;
  
  return React.cloneElement(origin, {
    style: [{fontFamily}, origin.props.style]
  });
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerTransparent: true,
        headerLeft: () => null,
        headerTitle: () => <Image source={require('./assets/seaguardwhite.png')} style={{ width: 150, height: 40, resizeMode: 'contain' }} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <LanguagePicker />
            <TouchableOpacity onPress={() => navigation.navigate('Compass')} style={{ marginLeft: 15 }}>
              <Ionicons name="compass-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    />
    {/* Add other screens in HomeStack here if they need to be navigated to from HomeScreen */}
    <Stack.Screen name="Compass" component={CompassScreen} />
    <Stack.Screen name="SOS" component={SOSScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <AnimatedTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="Maps" component={MapsScreen} />
    <Tab.Screen name="Features" component={FeaturesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

const App = () => {
  const [fontsLoaded] = useFonts({
    InstrumentSans_400Regular,
    InstrumentSans_700Bold,
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LanguageProvider>
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
          <Stack.Screen name="LogNewCatch" component={LogNewCatchScreen} />
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
          <Stack.Screen name="GetPredictions" component={GetPredictionsScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;