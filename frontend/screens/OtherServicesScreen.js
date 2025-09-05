import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherServicesScreen = () => (
  <View style={styles.container}>
    <Text>Other Services Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OtherServicesScreen;