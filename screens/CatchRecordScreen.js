import React from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import BigButton from '../components/BigButton';

const CatchRecordScreen = ({ navigation }) => {
  const handleSubmit = () => {
    Alert.alert('Success', 'Catch record submitted!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Record Your Catch</Text>
        
        <BigButton title="Upload Photo" onPress={() => Alert.alert('Mock', 'Photo picker would open here.')} />

        <TextInput
          style={styles.input}
          placeholder="Enter Fish Type (e.g., Tuna)"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Weight (kg)"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
        />

        <BigButton title="Submit Record" onPress={handleSubmit} />
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
    padding: 20,
  },
  header: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default CatchRecordScreen;
