import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { COLORS } from '../constants/colors';

const EditProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params.name);

  const handleSave = () => {
    navigation.navigate('Profile', { newName: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleSave} color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
