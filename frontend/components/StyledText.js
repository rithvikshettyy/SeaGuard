import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const regularFont = 'InstrumentSans_400Regular';
const boldFont = 'InstrumentSans_700Bold';

export const Text = (props) => {
  const { style, ...otherProps } = props;
  const styles = StyleSheet.flatten(style);
  
  const fontFamily = (styles && (styles.fontWeight === 'bold' || styles.fontWeight >= '700')) 
    ? boldFont 
    : regularFont;
  
  return (
    <RNText 
      {...otherProps} 
      style={[{ fontFamily }, style]}
    />
  );
};