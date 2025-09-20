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
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { screenTexts } from '../constants/screenTexts';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';
import { getAvailableLanguages, getLanguageNames } from '../constants/screenTexts';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { language, changeLanguage } = useLanguage();

  const LANGUAGES = getAvailableLanguages().map(code => ({
    code,
    name: getLanguageNames()[code]
  }));

  const handleLanguageSelect = (languageCode) => {
    changeLanguage(languageCode);
    setModalVisible(false);
  };

  const handleLogin = () => {
    // Mock login logic
    if (phoneNumber && otp) {
      navigation.replace('PurposeOnboarding');
    } else {
      Alert.alert(
        screenTexts.LoginScreen[language].error || 'Error',
        screenTexts.LoginScreen[language].errors?.missingFields || 'Please fill in all fields'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <TouchableOpacity 
        style={styles.languageButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.languageButtonText}>
          <Text>🌐 </Text>
          <Text>{getLanguageNames()[language]}</Text>
        </Text>
      </TouchableOpacity>
    </View>

      <Image
        source={require('../assets/fisherman.png')}
        style={styles.topImage}
      />

      <Text style={styles.title}>{screenTexts.LoginScreen[language].title}</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{screenTexts.LoginScreen[language].chooseLanguage}</Text>
            <FlatList
              data={LANGUAGES}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.languageItem}
                  onPress={() => handleLanguageSelect(item.code)}
                >
                  <Text style={styles.languageText}>{item.name}</Text>
                  {language === item.code && (
                    <Ionicons name="checkmark" size={24} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.code}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={screenTexts.LoginScreen[language].phone}
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={screenTexts.LoginScreen[language].otp}
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          secureTextEntry
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.resendOtp}>{screenTexts.LoginScreen[language].resendOtp}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>{screenTexts.LoginScreen[language].login}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('PurposeOnboarding')}> 
        <Text style={styles.signupText}>
          <Text>{screenTexts.LoginScreen[language].noAccount}</Text>
          {' '}
          <Text style={styles.signupLink}>{screenTexts.LoginScreen[language].signUp}</Text>
        </Text>
      </TouchableOpacity>      <Image
        source={require('../assets/seaguardbottomboat.png')}
        style={styles.bottomImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  languageButton: {
    padding: 8,
  },
  languageButtonText: {
    fontSize: 12,
    color: '#555',
  },
  topImage: {
    width: 150,
    height: 150,
    // resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  resendOtp: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#007bff',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: height * 0.25,
    resizeMode: 'stretch',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.primary,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LoginScreen;
