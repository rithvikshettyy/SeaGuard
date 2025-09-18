import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Modal, Switch, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { isPointInPolygon, getDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../constants/colors';
const mapHtml = require('../assets/map.html');
const boundariesData = require('../assets/boundary.json');

const PROXIMITY_THRESHOLD_METERS = 2000000000; // 20 km

const MapsScreen = () => {
  const webviewRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [layersModalVisible, setLayersModalVisible] = useState(false);
  
  const [statusInfo, setStatusInfo] = useState({ text: 'Status: Checking...', color: '#888' });

  // Layer visibility states
  const [showPfz, setShowPfz] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);

  const sendMessageToWebView = (message) => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(message));
    }
  };

  const fetchData = async (url, cacheKey, messageType) => {
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
          const data = JSON.parse(cached);
          sendMessageToWebView({ type: messageType, payload: data });
      }

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(url, { signal: controller.signal });
      if (response.ok) {
          const data = await response.json();
          await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
          sendMessageToWebView({ type: messageType, payload: data });
      }
    } catch (error) {
        console.log(`${cacheKey} fetch failed, using cache if available`, error);
    }
  }

  const getDistanceToBoundary = (userPoint, boundaries) => {
    let minDistance = Infinity;
    for (const feature of boundaries.features) {
      const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
      for (const polygon of polygons) {
        for (const ring of polygon) {
          for (const p of ring) {
            const vertex = { latitude: p[1], longitude: p[0] };
            const distance = getDistance(userPoint, vertex);
            if (distance < minDistance) {
              minDistance = distance;
            }
          }
        }
      }
    }
    return minDistance;
  };

  const checkBoundaryStatus = (userLocation) => {
    const userPoint = { latitude: userLocation.latitude, longitude: userLocation.longitude };
    let isInside = false;

    for (const feature of boundariesData.features) {
      const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
      for (const polygon of polygons) {
        const geolibPolygon = polygon[0].map(p => ({ latitude: p[1], longitude: p[0] }));
        if (isPointInPolygon(userPoint, geolibPolygon)) {
          isInside = true;
          break;
        }
      }
      if (isInside) break;
    }

    if (isInside) {
      const distanceToBoundary = getDistanceToBoundary(userPoint, boundariesData);
      if (distanceToBoundary < PROXIMITY_THRESHOLD_METERS) {
        setStatusInfo({
          text: `Warning: Approaching Boundary (${distanceInKm} km)`,
          color: '#FFA500', // Orange
        });
      } else {
        setStatusInfo({
          text: `Safe (${distanceInKm} km from boundary)`,
          color: '#4CAF50'
        }); // Green
      }
    } else {
      // When outside maritime boundaries, check if user is on land (in India)
      const isProbablyOnLandInIndia =
        userPoint.latitude >= 8.4 &&
        userPoint.latitude <= 37.6 &&
        userPoint.longitude >= 68.7 &&
        userPoint.longitude <= 97.25;

      if (isProbablyOnLandInIndia) {
        setStatusInfo({ text: 'Status: Safe', color: '#4CAF50' });
      } else {
        setStatusInfo({ text: 'Alert: Outside Maritime Boundaries', color: '#F44336' }); // Red
      }
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
      checkBoundaryStatus(initialLocation.coords);

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
          checkBoundaryStatus(newLocation.coords);
        }
      );
      
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
    document.addEventListener('message', function(event) {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'recenter':
                map.setView([message.payload.latitude, message.payload.longitude], 15);
                break;
            case 'pfz-data':
                if (pfzLayer) map.removeLayer(pfzLayer);
                // PFZ layer is added to the map by default on receiving data.
                pfzLayer = L.geoJSON(message.payload, { style: { color: 'blue', weight: 2 } }).addTo(map);
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
        onLoadEnd={() => {
          sendMessageToWebView({ type: 'boundary-data', payload: boundariesData });
        }}
      />
      <View style={[styles.statusContainer, { backgroundColor: statusInfo.color }]}>
        <Text style={styles.statusText}>{statusInfo.text}</Text>
      </View>
      <TouchableOpacity style={styles.layersButton} onPress={() => setLayersModalVisible(true)}>
        <Ionicons name="layers" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <Ionicons name="locate" size={32} color="white" />
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
    statusContainer: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        elevation: 8,
    },
    statusText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
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
