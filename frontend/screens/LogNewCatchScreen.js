import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const fishTypeImages = {
  'Pomfret': require('../assets/pomfretbg.png'),
  'Mackerel': require('../assets/mackerelbg.png'),
  'Prawns': require('../assets/prawnbg.png'),
  'Sardine': require('../assets/sardinebg.png'),
};

const LogNewCatchScreen = ({ navigation }) => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [selectedUnit, setSelectedUnit] = useState('kgs');
  const [date, setDate] = useState('');
  const [volume, setVolume] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const fishTypes = ['Pomfret', 'Mackerel', 'Prawns', 'Sardine'];

  const handleHourChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 12) {
      setHour('00');
    } else {
      setHour(text.padStart(2, '0'));
    }
  };

  const handleMinuteChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 59) {
      setMinute('00');
    } else {
      setMinute(text.padStart(2, '0'));
    }
  };

  const handleSaveCatchLog = async () => {
    if (!date || !volume || !selectedFish || !location) {
      Alert.alert('Error', 'Please fill all required fields (Date, Volume, Type of Fish, Location).');
      return;
    }

    const newLog = {
      id: Date.now().toString(), // Unique ID
      date: date, // Use the date from state
      time: `${hour}:${minute} ${ampm}`,
      weight: `${volume} ${selectedUnit}`,
      fishType: selectedFish,
      location: location,
      notes: notes,
      image: fishTypeImages[selectedFish], // Get image based on fish type
    };

    try {
      const storedLogs = await AsyncStorage.getItem('catchLogs');
      let existingLogs = [];
      if (storedLogs !== null) {
        existingLogs = JSON.parse(storedLogs);
      }
      const updatedLogs = [...existingLogs, newLog];
      await AsyncStorage.setItem('catchLogs', JSON.stringify(updatedLogs));
      console.log('New Catch Log saved to AsyncStorage:', newLog);
      navigation.navigate('CatchRecord'); // Navigate back to CatchRecordScreen
    } catch (error) {
      console.error('Error saving new catch log to AsyncStorage:', error);
      Alert.alert('Error', 'Failed to save catch log. Please try again.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log New Catch</Text>
        <View style={{ width: 28 }} /> {/* Placeholder for right icon */}
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {/* Date & Time */}
        <Text style={styles.sectionTitle}>Date & Time</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="DD/MM/YY"
              placeholderTextColor={COLORS.lightText}
              value={date}
              onChangeText={setDate}
            />
            <Ionicons name="calendar-outline" size={24} color={COLORS.lightText} style={styles.inputIcon} />
          </View>
          <View style={styles.timeInputContainer}>
            <TextInput
              style={styles.timeInput}
              placeholder="00"
              placeholderTextColor={COLORS.lightText}
              keyboardType="numeric"
              maxLength={2}
              value={hour}
              onChangeText={handleHourChange}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="00"
              placeholderTextColor={COLORS.lightText}
              keyboardType="numeric"
              maxLength={2}
              value={minute}
              onChangeText={handleMinuteChange}
            />
            <TouchableOpacity
              style={[styles.ampmButton, ampm === 'AM' && styles.selectedAmpmButton]}
              onPress={() => setAmpm('AM')}
            >
              <Text style={[styles.ampmButtonText, ampm === 'AM' && styles.selectedAmpmButtonText]}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ampmButton, ampm === 'PM' && styles.selectedAmpmButton]}
              onPress={() => setAmpm('PM')}
            >
              <Text style={[styles.ampmButtonText, ampm === 'PM' && styles.selectedAmpmButtonText]}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Catch Details */}
        <Text style={styles.sectionTitle}>Catch Details</Text>
        <View style={styles.catchDetailsContainer}>
          <TextInput
            style={styles.volumeInput}
            placeholder="Total Volume"
            placeholderTextColor={COLORS.lightText}
            keyboardType="numeric"
            value={volume}
            onChangeText={setVolume}
          />
          <View style={styles.unitDropdownContainer}>
            <Picker
              selectedValue={selectedUnit}
              onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              style={styles.unitPicker}
              itemStyle={styles.unitPickerItem}
            >
              <Picker.Item label="kgs" value="kgs" />
              <Picker.Item label="lbs" value="lbs" />
            </Picker>
          </View>
        </View>

        {/* Add Media */}
        <TouchableOpacity style={styles.addMediaContainer}>
          <Ionicons name="add-circle-outline" size={40} color={COLORS.lightText} />
          <Text style={styles.addMediaText}>Add media</Text>
        </TouchableOpacity>

        {/* Type of Fish */}
        <Text style={styles.sectionTitle}>Type of Fish</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedFish}
            onValueChange={(itemValue, itemIndex) => setSelectedFish(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Species" value={null} color={COLORS.lightText} />
            {fishTypes.map((fish, index) => (
              <Picker.Item key={index} label={fish} value={fish} />
            ))}
          </Picker>
        </View>

        {/* Location & Notes */}
        <Text style={styles.sectionTitle}>Location & Notes</Text>
        <TextInput
          style={styles.locationInput}
          placeholder="Location"
          placeholderTextColor={COLORS.lightText}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.notesInput}
          placeholder="Notes"
          placeholderTextColor={COLORS.lightText}
          multiline
          value={notes}
          onChangeText={setNotes}
        />
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCatchLog}>
        <Text style={styles.saveButtonText}>Save Catch Log</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#0A2540',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20, // Space for save button
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  // Date & Time
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInputContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#959191',
    marginRight: 10,
  },
  dateInput: {
    flex: 1,
    color: COLORS.text,
  },
  timeInputContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    paddingHorizontal: 5,
    height: 50,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#959191',
  },
  timeInput: {
    width: 25,
    textAlign: 'center',
    color: COLORS.text,
  },
  timeSeparator: {
    fontSize: 20,
    color: COLORS.lightText,
  },
  ampmButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  selectedAmpmButton: {
    backgroundColor: COLORS.primary, // Use a primary color for highlighting
  },
  ampmButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  selectedAmpmButtonText: {
    color: '#FFFFFF',
  },
  inputIcon: {
    marginLeft: 10,
    color: '#555',
  },
  // Catch Details
  catchDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  volumeInput: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#959191',
  },
  unitButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  unitDropdownContainer: {
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#959191',
  },
  unitPicker: {
    width: 100,
    color: COLORS.text,
  },
  unitPickerItem: {
    color: COLORS.text,
  },
  // Add Media
  addMediaContainer: {
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#959191',
    borderStyle: 'solid',
    marginBottom: 15,
  },
  addMediaText: {
    color: COLORS.lightText,
    marginTop: 10,
  },
  // Type of Fish
  dropdownContainer: {
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    height: 50, // Fixed height for the Picker
    marginBottom: 15,
    justifyContent: 'center', // Center content vertically
    overflow: 'hidden', // Hide overflow for borderRadius
    borderWidth: 1,
    borderColor: '#959191',
  },
  picker: {
    color: COLORS.text, // Text color for selected item
  },
  pickerItem: {
    color: COLORS.text, // Text color for options (iOS only)
  },
  // Location & Notes
  locationInput: {
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#959191',
  },
  notesInput: {
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15, // For multiline input
    height: 100,
    textAlignVertical: 'top', // For multiline input
    marginBottom: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#959191',
  },
  // Save Button
  saveButton: {
    backgroundColor: '#0A2540', // Dark blue from reference
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 15, // To match screen padding
    marginBottom: 20, // Space from bottom nav
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LogNewCatchScreen;
