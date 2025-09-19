import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { Picker } from '@react-native-picker/picker';

const LogNewCatchScreen = ({ navigation }) => {
  const [selectedFish, setSelectedFish] = useState(null);

  const fishTypes = ['Pomfret', 'Mackerel', 'Prawns', 'Sardine'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.text} />
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
            />
            <Ionicons name="calendar-outline" size={24} color={COLORS.lightText} style={styles.inputIcon} />
          </View>
          <View style={styles.timeInputContainer}>
            <TextInput
              style={styles.timeInput}
              placeholder="00"
              placeholderTextColor={COLORS.lightText}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="00"
              placeholderTextColor={COLORS.lightText}
            />
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
          />
          <TouchableOpacity style={styles.unitButton}>
            <Text style={styles.unitButtonText}>kgs/lbs</Text>
          </TouchableOpacity>
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
        />
        <TextInput
          style={styles.notesInput}
          placeholder="Notes"
          placeholderTextColor={COLORS.lightText}
          multiline
        />
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Catch Log</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
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
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  dateInput: {
    flex: 1,
    color: COLORS.text,
  },
  timeInputContainer: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'space-around',
  },
  timeInput: {
    width: 30,
    textAlign: 'center',
    color: COLORS.text,
  },
  timeSeparator: {
    fontSize: 20,
    color: COLORS.lightText,
  },
  inputIcon: {
    marginLeft: 10,
  },
  // Catch Details
  catchDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  volumeInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    color: COLORS.text,
  },
  unitButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unitButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  // Add Media
  addMediaContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'dotted',
    marginBottom: 15,
  },
  addMediaText: {
    color: COLORS.lightText,
    marginTop: 10,
  },
  // Type of Fish
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 50, // Fixed height for the Picker
    marginBottom: 15,
    justifyContent: 'center', // Center content vertically
    overflow: 'hidden', // Hide overflow for borderRadius
  },
  picker: {
    color: COLORS.text, // Text color for selected item
  },
  pickerItem: {
    color: COLORS.text, // Text color for options (iOS only)
  },
  // Location & Notes
  locationInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    color: COLORS.text,
  },
  notesInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15, // For multiline input
    height: 100,
    textAlignVertical: 'top', // For multiline input
    marginBottom: 15,
    color: COLORS.text,
  },
  // Save Button
  saveButton: {
    backgroundColor: COLORS.primary, // Assuming COLORS.primary is the blue color
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
