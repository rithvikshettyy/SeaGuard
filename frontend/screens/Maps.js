import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text, Modal, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { isPointNearLine } from 'geolib';

import { COLORS } from '../constants/colors';
const mapHtml = require('../assets/map.html');

const PROXIMITY_THRESHOLD_METERS = 10000; // 10 km
const BOUNDARIES_URL = 'https://geo.vliz.be/geoserver/wfs?request=getfeature&service=wfs&version=1.1.0&typename=MarineRegions:eez&filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Emrgid_eez%3C/PropertyName%3E%3CLiteral%3E8480%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&outputFormat=application/json';

const MapsScreen = () => {
  const webviewRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [layersModalVisible, setLayersModalVisible] = useState(false);
  const [boundariesData, setBoundariesData] = useState(null);

  // Layer visibility states
  const [showPfz, setShowPfz] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(true);

  // Alert state
  const [isNearBoundary, setIsNearBoundary] = useState(false);

  const sendMessageToWebView = (message) => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(message));
    }
  };

  const checkBoundaryProximity = (userLocation) => {
    if (!boundariesData) return;

    const userPoint = { latitude: userLocation.latitude, longitude: userLocation.longitude };
    let near = false;

    for (const feature of boundariesData.features) {
        const polygons = feature.geometry.type === 'Polygon' 
            ? [feature.geometry.coordinates]
            : feature.geometry.coordinates;

        for (const polygon of polygons) {
            for (const ring of polygon) { 
                for (let i = 0; i < ring.length - 1; i++) {
                    const lineStart = { longitude: ring[i][0], latitude: ring[i][1] };
                    const lineEnd = { longitude: ring[i+1][0], latitude: ring[i+1][1] };

                    if (isPointNearLine(userPoint, lineStart, lineEnd, PROXIMITY_THRESHOLD_METERS)) {
                        near = true;
                        break;
                    }
                }
                if (near) break;
            }
            if (near) break;
        }
        if (near) break;
    }

    if (near && !isNearBoundary) {
      Alert.alert(
        'Boundary Alert',
        'You are approaching a maritime boundary. Proceed with caution.',
        [{ text: 'OK' }]
      );
      setIsNearBoundary(true);
    } else if (!near && isNearBoundary) {
      setIsNearBoundary(false); // Reset when user moves away
    }
  };

  const fetchData = async (url, cacheKey, messageType) => {
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
            const data = JSON.parse(cached);
            if (messageType === 'boundary-data') setBoundariesData(data);
            sendMessageToWebView({ type: messageType, payload: data });
        }

        const controller = new AbortController();
        setTimeout(() => controller.abort(), 30000); // 30s timeout

        const response = await fetch(url, { signal: controller.signal, headers: { 'Accept-Encoding': 'gzip' } });
        if (response.ok) {
            const data = await response.json();
            await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
            if (messageType === 'boundary-data') setBoundariesData(data);
            sendMessageToWebView({ type: messageType, payload: data });
        }
      } catch (error) {
          console.log(`${cacheKey} fetch failed, using cache if available`, error);
      }
  }

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
          timeInterval: 5000, // Check every 5 seconds
          distanceInterval: 10, // Or every 10 meters
        },
        (newLocation) => {
          setLocation(newLocation);
          checkBoundaryProximity(newLocation.coords);
        }
      );

      fetchData(BOUNDARIES_URL, 'boundariesData', 'boundary-data');
      fetchData('https://incois.gov.in/geoserver/PFZ_Automation/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=PFZ_Automation:pfzlines&outputFormat=application/json', 'pfzData', 'pfz-data');
    })();

    return () => subscription?.remove();
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
      sendMessageToWebView({
        type: 'recenter',
        payload: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }
  };

  const toggleLayer = (layer, setLayer, type) => {
    const newVisibility = !layer;
    setLayer(newVisibility);
    sendMessageToWebView({ type, payload: newVisibility });
  };

  const injectedJavaScript = `
    let userMarker, pfzLayer, boundaryLayer;

    const locationIcon = L.divIcon({
        className: 'location-marker',
        html: '<div class="accuracy-circle"></div><div class="dot"></div>',
        iconSize: [44, 44],
    });

    document.addEventListener('message', function(event) {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'location':
                const { latitude, longitude } = message.payload;
                if (userMarker) {
                    userMarker.setLatLng([latitude, longitude]);
                } else {
                    userMarker = L.marker([latitude, longitude], { icon: locationIcon }).addTo(map);
                }
                break;
            
            case 'recenter':
                map.setView([message.payload.latitude, message.payload.longitude], 15);
                break;

            case 'pfz-data':
                if (pfzLayer) map.removeLayer(pfzLayer);
                pfzLayer = L.geoJSON(message.payload, {
                    style: { color: 'blue', weight: 2 }
                });
                break;

            case 'toggle-pfz':
                if (pfzLayer) {
                    if (message.payload) map.addLayer(pfzLayer);
                    else map.removeLayer(pfzLayer);
                }
                break;

            case 'boundary-data':
                if (boundaryLayer) map.removeLayer(boundaryLayer);
                boundaryLayer = L.geoJSON(message.payload, {
                    style: { color: "#FF4500", weight: 2, opacity: 0.8, fillOpacity: 0.2 }
                }).addTo(map);
                break;

            case 'toggle-boundaries':
                if (boundaryLayer) {
                    if (message.payload) map.addLayer(boundaryLayer);
                    else map.removeLayer(boundaryLayer);
                }
                break;
        }
    });
    true;
  `;

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
        injectedJavaScript={injectedJavaScript}
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
              <Text style={styles.toggleText}>Potential Fishing Zones</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={showPfz ? COLORS.primary : "#f4f3f4"}
                onValueChange={() => toggleLayer(showPfz, setShowPfz, 'toggle-pfz')}
                value={showPfz}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>Maritime Boundaries</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={showBoundaries ? COLORS.primary : "#f4f3f4"}
                onValueChange={() => toggleLayer(showBoundaries, setShowBoundaries, 'toggle-boundaries')}
                value={showBoundaries}
              />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
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
    layersButton: {
        position: 'absolute',
        bottom: 170,
        right: 30,
        backgroundColor: COLORS.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
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
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 12,
    },
    toggleText: {
        fontSize: 16,
    },
    closeButton: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MapsScreen;