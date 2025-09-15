import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.topNav}>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageButtonText}>🌐 Choose Language (Default: English IN)</Text>
        </TouchableOpacity>
      </View> */}
      <Image
        source={require('../assets/fisherman.png')}
        style={styles.topImage}
      />
      <Text style={styles.title}>Welcome user!{`\n`}Glad to see you again!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔑</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          secureTextEntry
          value={otp}
          onChangeText={setOtp}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.resendOtp}>resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.replace('Main')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Main')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/oceanbg.png')}
        style={styles.bottomImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  languageButton: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  languageButtonText: {
    fontSize: 12,
    textAlign: 'center',
  },
  topImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    marginTop: -20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  resendOtp: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
    color: '#007bff',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.2,
    resizeMode: 'stretch',
  },
});

export default LoginScreen;