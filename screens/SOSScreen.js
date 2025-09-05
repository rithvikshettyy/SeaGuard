import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const SOSScreen = () => {
  const handleSos = () => {
    Alert.alert(
      'Confirm SOS',
      'Are you sure you want to send an SOS signal? This will alert the authorities.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'SEND SOS', onPress: () => Alert.alert('SOS Sent', 'Your SOS signal has been sent to the nearest authorities.'), style: 'destructive' },
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
        <TouchableOpacity style={styles.sosButton} onPress={handleSos}>
          <Text style={styles.sosButtonText}>SEND SOS</Text>
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
