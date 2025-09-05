import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.85;
const TICK_RADIUS = COMPASS_SIZE / 2 - 5;

const CompassScreen = () => {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);
  const rotation = useRef(new Animated.Value(0)).current;
  const locationWatcherRef = useRef(null);
  const headingWatcherRef = useRef(null);

  useEffect(() => {
    const setupLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          setErrorMsg('Location services are not enabled. Please enable them in your settings.');
          return;
        }

        // Start watching position
        locationWatcherRef.current = await Location.watchPositionAsync(
          { 
            accuracy: Location.Accuracy.High, 
            timeInterval: 1000, 
            distanceInterval: 1 
          }, 
          async (loc) => {
            setLocation(loc.coords);
            try {
              const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
              });
              if (reverseGeocode.length > 0) {
                const place = reverseGeocode[0];
                setCity(`${place.city || place.district || ''}, ${place.region || ''}`.replace(/^, |, $/g, ''));
              }
            } catch (error) {
              console.log('Reverse geocoding failed:', error);
            }
          }
        );

        // Start watching heading - FIXED: Store rotation ref in a variable accessible in the closure
        const rotationRef = rotation;
        headingWatcherRef.current = await Location.watchHeadingAsync((head) => {
          // Normalize the heading to be between 0-360
          let normalizedHeading = head.magHeading;
          if (normalizedHeading < 0) normalizedHeading += 360;
          if (normalizedHeading >= 360) normalizedHeading -= 360;
          
          setHeading(normalizedHeading);
          
          // Use the rotation ref correctly - ORIGINAL SPEED
          Animated.spring(rotationRef, {
            toValue: -normalizedHeading,
            speed: 6,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        });
      } catch (error) {
        console.error('Error setting up location:', error);
        setErrorMsg('Failed to initialize location services');
      }
    };

    setupLocation();

    return () => {
      if (locationWatcherRef.current) {
        locationWatcherRef.current.remove();
      }
      if (headingWatcherRef.current) {
        headingWatcherRef.current.remove();
      }
    };
  }, []); // Empty dependency array since we're using refs

  const getCardinalDirection = (angle) => {
    // Normalize angle to be between 0 and 360
    let normalizedAngle = angle % 360;
    if (normalizedAngle < 0) normalizedAngle += 360;
    
    if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) {
      return 'N';
    } else if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) {
      return 'NE';
    } else if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) {
      return 'E';
    } else if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) {
      return 'SE';
    } else if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) {
      return 'S';
    } else if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) {
      return 'SW';
    } else if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) {
      return 'W';
    } else if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) {
      return 'NW';
    }
  };

  const rotationStyle = {
    transform: [{ 
      rotate: rotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
      }) 
    }],
  };

  const formatCoordinates = (lat, lng) => {
    if (lat === undefined || lng === undefined) return 'Acquiring coordinates...';
    
    const latDeg = Math.floor(Math.abs(lat));
    const latMin = Math.floor((Math.abs(lat) - latDeg) * 60);
    const latSec = Math.floor(((Math.abs(lat) - latDeg) * 60 - latMin) * 60);
    
    const lngDeg = Math.floor(Math.abs(lng));
    const lngMin = Math.floor((Math.abs(lng) - lngDeg) * 60);
    const lngSec = Math.floor(((Math.abs(lng) - lngDeg) * 60 - lngMin) * 60);
    
    return `${latDeg}°${latMin}'${latSec}" ${lat >= 0 ? 'N' : 'S'}  ${lngDeg}°${lngMin}'${latSec}" ${lng >= 0 ? 'E' : 'W'}`;
  };

  // Function to render degree numbers at specific positions
  const renderDegreeNumbers = () => {
    const degrees = [30, 60, 120, 150, 210, 240, 300, 330];
    const radius = COMPASS_SIZE / 2 - 30;
    
    return degrees.map((degree) => {
      const angleInRadians = (degree * Math.PI) / 180;
      const x = radius * Math.sin(angleInRadians);
      const y = -radius * Math.cos(angleInRadians);
      
      return (
        <Text
          key={degree}
          style={[
            styles.degreeNumber,
            { 
              transform: [
                { translateX: x },
                { translateY: y }
              ]
            }
          ]}
        >
          {degree}
        </Text>
      );
    });
  };

  // Function to render tick marks
  const renderTicks = () => {
    return [...Array(72).keys()].map((i) => {
      const angle = i * 5;
      const isMajor = angle % 30 === 0;
      const isMinor = angle % 10 === 0;
      
      if (!isMinor && !isMajor) return null;
      
      return (
        <View 
          key={angle} 
          style={[
            styles.tickContainer, 
            { transform: [{ rotate: `${angle}deg` }] }
          ]}
        >
          <View 
            style={[
              styles.tick,
              isMajor ? styles.majorTick : styles.minorTick
            ]} 
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* North Indicator Arrow */}
      <View style={styles.northArrow}>
        <View style={styles.arrowTop} />
        <View style={styles.arrowBottom} />
      </View>

      {/* Compass */}
      <View style={styles.compassWrapper}>
        <Animated.View style={[styles.compassContainer, rotationStyle]}>
          {/* Outer ring with tick marks */}
          <View style={styles.compassRing}>
            {/* Generate tick marks */}
            {renderTicks()}
            
            {/* Cardinal direction labels */}
            <Text style={[styles.cardinalText, styles.northText]}>N</Text>
            <Text style={[styles.cardinalText, styles.eastText]}>E</Text>
            <Text style={[styles.cardinalText, styles.southText]}>S</Text>
            <Text style={[styles.cardinalText, styles.westText]}>W</Text>
            
            {/* Degree numbers */}
            {renderDegreeNumbers()}
          </View>
          
          {/* Center crosshair without inner circle */}
          <View style={styles.crosshairContainer}>
            <View style={styles.crosshairVertical} />
            <View style={styles.crosshairHorizontal} />
            <View style={styles.centerDot} />
          </View>
        </Animated.View>
      </View>

      {/* Heading Display */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingValue}>{Math.round(heading)}°</Text>
        <Text style={styles.headingDirection}>{getCardinalDirection(heading)}</Text>
      </View>

      {/* Location Information */}
      <View style={styles.locationContainer}>
        {location ? (
          <>
            <Text style={styles.coordinatesText}>
              {formatCoordinates(location.latitude, location.longitude)}
            </Text>
            <Text style={styles.locationText}>
              {city || 'Unknown Location'}
            </Text>
            {location.altitude && (
              <Text style={styles.elevationText}>
                {Math.round(location.altitude)}m Elevation
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.locationText}>{errorMsg || 'Acquiring GPS signal...'}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  northArrow: {
    position: 'absolute',
    top: '20%',
    zIndex: 10,
    alignItems: 'center',
  },
  arrowTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff4444',
  },
  arrowBottom: {
    width: 4,
    height: 8,
    backgroundColor: '#ff4444',
    marginTop: -1,
  },
  compassWrapper: {
    marginBottom: 30,
  },
  compassContainer: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassRing: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
    backgroundColor: '#ffffff',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tickContainer: {
    position: 'absolute',
    width: 2,
    height: TICK_RADIUS,
    top: (COMPASS_SIZE - TICK_RADIUS) / 2,
    left: (COMPASS_SIZE / 2) - 1,
    alignItems: 'center',
  },
  tick: {
    backgroundColor: '#333333',
  },
  majorTick: {
    height: 20,
    width: 2,
    backgroundColor: '#000000',
  },
  minorTick: {
    height: 12,
    width: 1,
  },
  cardinalText: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  northText: {
    top: 15,
    left: COMPASS_SIZE / 2 - 10,
  },
  eastText: {
    right: 15,
    top: COMPASS_SIZE / 2 - 14,
  },
  southText: {
    bottom: 15,
    left: COMPASS_SIZE / 2 - 10,
  },
  westText: {
    left: 15,
    top: COMPASS_SIZE / 2 - 14,
  },
  degreeNumber: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    left: COMPASS_SIZE / 2 - 10,
    top: COMPASS_SIZE / 2 - 10,
    width: 20,
    height: 20,
    textAlign: 'center',
  },
  crosshairContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crosshairVertical: {
    position: 'absolute',
    width: 2,
    height: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
  },
  crosshairHorizontal: {
    position: 'absolute',
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff0000',
    position: 'absolute',
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headingValue: {
    fontSize: 60,
    fontWeight: '200',
    color: '#000000',
    marginBottom: 5,
  },
  headingDirection: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
  locationContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  coordinatesText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '400',
    textAlign: 'center',
  },
  locationText: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  elevationText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
});

export default CompassScreen;