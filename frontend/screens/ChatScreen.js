import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleMic = () => {
    // Implement speech-to-text functionality here
    console.log('Mic button pressed');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SeaBot - AI Assistant</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.chatContainer}>
        <Image source={require('../assets/blob.gif')} style={styles.gif} contentFit="contain" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity onPress={handleMic} style={styles.micButton}>
          <Ionicons name="mic" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1C1C1E',
    borderBottomWidth: 1,
    borderBottomColor: '#38383A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 350,
    height: 350,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#38383A',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
  micButton: {
    padding: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;