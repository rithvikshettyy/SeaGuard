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
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    navigation.replace('Main');
    return
    console.log('Sending OTP to:', phoneNumber);
    try {
      const response = await fetch('http://10.0.2.2:8000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "phoneNumber": phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        // Alert.alert('Success', 'OTP sent successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.replace('Main');
      } else {
        Alert.alert('Error', data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          editable={!otpSent}
        />
      </View>

      {otpSent && (
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
      )}

      {!otpSent ? (
        <TouchableOpacity style={styles.loginButton} onPress={handleSendOtp}>
          <Text style={styles.loginButtonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity>
            <Text style={styles.resendOtp}>resend OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleVerifyOtp}>
            <Text style={styles.loginButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

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