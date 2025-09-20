import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

// IMPORTANT: Storing API keys in the frontend is a security risk.
// This should be replaced with a backend call in a production environment.
const SARVAM_API_KEY = "sk_f9x0xata_kc6bCG9hLzrmCXwx9lS83m30";
import { Env } from '../constants/env';
const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const flatListRef = useRef();
  const BASE_URL = Env.BASE_URL;

  useEffect(() => {
    setChatHistory([
      {
        role: 'bot',
        content: 'Hello! I am SeaBot, your AI assistant. How can I help you today?',
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      const newUserMessage = { role: 'user', content: message };
      const updatedChatHistory = [...chatHistory, newUserMessage];
      setChatHistory(updatedChatHistory);
      setMessage('');
      setLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history: updatedChatHistory.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          }),
        });

        const data = await response.json();
        const botResponse = { role: 'bot', content: data.response };
        setChatHistory((prevHistory) => [...prevHistory, botResponse]);
      } catch (error) {
        console.error('Error fetching chat response:', error);
        const errorResponse = {
          role: 'bot',
          content: 'Sorry, I am having trouble connecting. Please try again later.',
        };
        setChatHistory((prevHistory) => [...prevHistory, errorResponse]);
      } finally {
        setLoading(false);
      }
    }
  };

  const transcribeAudio = async (uri) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        name: `recording-${Date.now()}.m4a`,
        type: 'audio/m4a',
      });

      const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': SARVAM_API_KEY,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.text) {
        setMessage(data.text);
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        console.error('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    transcribeAudio(uri);
  };

  const handleMicPress = () => {
    recording ? stopRecording() : startRecording();
  };

  const renderChatItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user'
          ? styles.userMessageContainer
          : styles.botMessageContainer,
      ]}
    >
      <Text
        style={
          item.role === 'user'
            ? styles.userMessageText
            : styles.botMessageText
        }
      >
        {item.content}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SeaBot - AI Assistant</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.chatContainer}>
        {chatHistory.length === 1 && !loading ? (
          <Image
            source={require('../assets/blob.gif')}
            style={styles.gif}
            contentFit="contain"
          />
        ) : (
          <FlatList
            ref={flatListRef}
            data={chatHistory}
            renderItem={renderChatItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatList}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({ animated: true })
            }
          />
        )}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loading}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
          <Ionicons
            name={isRecording ? 'stop-circle-outline' : 'mic'}
            size={24}
            color={isRecording ? 'red' : '#007AFF'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSend}
          style={styles.sendButton}
          disabled={loading}
        >
          <Ionicons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  chatContainer: {
    flex: 1,
  },
  chatList: {
    padding: 10,
  },
  gif: {
    width: 349,
    height: 349,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  messageContainer: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botMessageContainer: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  botMessageText: {
    color: '#000000',
    fontSize: 16,
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
  },
  micButton: {
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;
