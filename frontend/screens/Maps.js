import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
 
const mapHtml = require('../assets/map.html');
 
const MapsScreen = () => {
  const webviewRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [showPfz, setShowPfz] = useState(false);
  const [layersModalVisible, setLayersModalVisible] = useState(false);
 
  const sendMessageToWebView = (message) => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(message));
    }
  };
 
  useEffect(() => {
    let subscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied.');
        return;
      }
 
      const initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);
 
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
 
      try {
        const response = await fetch('https://incois.gov.in/geoserver/PFZ_Automation/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=PFZ_Automation:pfzlines&outputFormat=application/json%27');
        const pfzData = await response.json();
        sendMessageToWebView({ type: 'pfz-data', payload: pfzData });
      } catch (error) {
        console.error('Error fetching PFZ data:', error);
        Alert.alert('Error', 'Could not fetch Potential Fishing Zones data.');
      }
    })();
 
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
 
  useEffect(() => {
    if (location) {
      sendMessageToWebView({
        type: 'location',
        payload: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }
  }, [location]);
 
  const handleRecenter = () => {
    if (location) {
        const message = {
            type: 'recenter',
            payload: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          };
          sendMessageToWebView(message);
    }
  };
 
  const togglePfz = () => {
    const newShowPfz = !showPfz;
    setShowPfz(newShowPfz);
    sendMessageToWebView({ type: 'toggle-pfz', payload: newShowPfz });
  };
 
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={mapHtml}
        style={styles.map}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <Ionicons name="locate" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.layersButton} onPress={() => setLayersModalVisible(true)}>
        <Ionicons name="layers" size={32} color="white" />
      </TouchableOpacity>
 
      <Modal
        animationType="slide"
        transparent={true}
        visible={layersModalVisible}
        onRequestClose={() => setLayersModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Map Layers</Text>
            <View style={styles.toggleRow}>
              <Text>Potential Fishing Zones</Text>
              <TouchableOpacity onPress={togglePfz} style={[styles.toggleButton, showPfz && styles.toggleButtonActive]}>
                <Text style={styles.buttonText}>{showPfz ? 'ON' : 'OFF'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setLayersModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recenterButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: COLORS.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    layersButton: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        backgroundColor: COLORS.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    toggleButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    toggleButtonActive: {
        backgroundColor: COLORS.primary,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginTop: 15,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
 
export default MapsScreen;