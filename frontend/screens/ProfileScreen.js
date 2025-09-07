import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('John Doe');

  useEffect(() => {
    if (route.params?.newName) {
      setName(route.params.newName);
    }
  }, [route.params?.newName]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.defaultImageContainer}>
                <Ionicons name="person" size={60} color="#ffffff" />
              </View>
            )}
            <View style={styles.editIcon}>
              <Ionicons name="camera" size={16} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>Fisherman</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Contact Number</Text>
              <Text style={styles.infoValue}>+91 98765 43210</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="boat-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Vessel ID</Text>
              <Text style={styles.infoValue}>IND-TN-01-MM-1234</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Home Port</Text>
              <Text style={styles.infoValue}>Kanyakumari</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Account Settings</Text>
          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => navigation.navigate('HomeTab', { screen: 'EditProfile', params: { name: name } })}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="person-outline" size={22} color="#666666" />
              <Text style={styles.optionText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cccccc" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => console.log('Change Password')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="lock-closed-outline" size={22} color="#666666" />
              <Text style={styles.optionText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cccccc" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => console.log('Privacy Settings')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="shield-outline" size={22} color="#666666" />
              <Text style={styles.optionText}>Privacy Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cccccc" />
          </TouchableOpacity>
        </View>

        {/* Help & Support */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Help & Support</Text>
          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => console.log('FAQ')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle-outline" size={22} color="#666666" />
              <Text style={styles.optionText}>FAQ</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cccccc" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => console.log('Contact Us')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="mail-outline" size={22} color="#666666" />
              <Text style={styles.optionText}>Contact Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cccccc" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionRow, styles.lastOption]} 
            onPress={() => console.log('About')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="information-circle-outline" size={22} color="#666666" />
              <Text style={styles.optionText}>About SeaGuard</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cccccc" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#dc3545" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  defaultImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 16,
    fontWeight: '400',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen;