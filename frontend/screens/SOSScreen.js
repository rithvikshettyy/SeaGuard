import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import * as Location from 'expo-location';
import { COLORS } from '../constants/colors';

const SOSScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleSos = () => {
    Alert.alert(
      'Confirm SOS',
      'Are you sure you want to send an SOS signal? This will open your SMS app to alert the authorities.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'SEND SOS', 
          onPress: async () => {
            setLoading(true);
            try {
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location was denied.');
                setLoading(false);
                return;
              }

              let location = await Location.getCurrentPositionAsync({});
              const { latitude, longitude } = location.coords;

              const message = `SOS! Emergency situation. Need immediate assistance. My location is: https://maps.google.com/?q=${latitude},${longitude}`;
              const phoneNumber = '+918369146457';
              const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

              const supported = await Linking.canOpenURL(smsUrl);
              if (supported) {
                await Linking.openURL(smsUrl);
                Alert.alert('SOS Ready', 'Your SMS app has been opened. Please send the message.');
              } else {
                Alert.alert('Error', 'Unable to open SMS app.');
              }

            } catch (error) {
              Alert.alert('Error', error.message);
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive' 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>SOS</Text>
        <Text style={styles.instructions}>
          Press and hold the button in case of an emergency. Your location will be sent to the coast guard.
        </Text>
        <TouchableOpacity style={styles.sosButton} onPress={handleSos} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.white} />
          ) : (
            <Text style={styles.sosButtonText}>SEND SOS</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: 60,
  },
  instructions: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  sosButton: {
    backgroundColor: COLORS.sos,
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(217, 45, 32, 0.5)',
  },
  sosButtonText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default SOSScreen;
