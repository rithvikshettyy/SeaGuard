
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');
const TITLE_BAR_HEIGHT = 56; // Approximate height of the title bar

const HamburgerMenu = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current; // Initial position off-screen to the right

  const toggleMenu = () => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerIcon}>
        <Ionicons name="menu" size={32} color={COLORS.white} />
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1} // Ensures the touch is captured
          onPress={toggleMenu} // Close menu when overlay is pressed
        />
        <Animated.View style={[{ transform: [{ translateX: slideAnim }] }, styles.modalContainer]}>
          <View style={styles.modalView}>
            <ScrollView>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('NoFishingZone');
                }}
              >
                <Text style={styles.modalText}>No Fishing Zone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('PotentialFishingZone');
                }}
              >
                <Text style={styles.modalText}>Potential FishingZone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('GpsNavigation');
                }}
              >
                <Text style={styles.modalText}>GPS and Navigation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('DisasterAlert');
                }}
              >
                <Text style={styles.modalText}>Disaster Alert</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('ImportantContacts');
                }}
              >
                <Text style={styles.modalText}>Important Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('IBLAlerts');
                }}
              >
                <Text style={styles.modalText}>IBL Alerts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('OtherServices');
                }}
              >
                <Text style={styles.modalText}>Other Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('SeaSafetyLivelihood');
                }}
              >
                <Text style={styles.modalText}>Sea Safety and Livelihood</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Settings');
                }}
              >
                <Text style={styles.modalText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('About');
                }}
              >
                <Text style={styles.modalText}>About</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  hamburgerIcon: {
    marginRight: 15,
  },
  modalContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight + TITLE_BAR_HEIGHT,
    right: 0,
    height: height - (Constants.statusBarHeight + TITLE_BAR_HEIGHT),
    width: width * 0.75,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: '100%', // Adjust to fill the modal width
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HamburgerMenu;




