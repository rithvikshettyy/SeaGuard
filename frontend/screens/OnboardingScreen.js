import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Hourly Forecasts',
    subtitle: 'Hourly wave and weather reports to help keep you safe',
    image: require('../assets/banner1new.jpg'),
  },
  {
    key: '2',
    title: 'Fishing Zones',
    subtitle: 'Enhanced fishing zone findings',
    image: require('../assets/banner2.png'),
  },
  {
    key: '3',
    title: 'SOS Alerts',
    subtitle: 'Offline SOS Alert',
    image: require('../assets/banner3.png'),
  },
  {
    key: '4',
    title: 'Multilingual Support',
    subtitle: 'Multi language for Indian languages',
    image: require('../assets/banner4.png'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }) => (
    <ImageBackground source={item.image} style={styles.slide}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/seaguardwhite.png')} style={styles.logo} />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 1,
        }}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)' },
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  logo: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    zIndex: 1,
    height: 50,
    width: 150,
    resizeMode: 'contain',
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: height * 0.3,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  pagination: {
    position: 'absolute',
    bottom: height * 0.25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 10,
    marginBottom: 20,
    // borderWidth: 0,
    // borderColor: '#fff'
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;