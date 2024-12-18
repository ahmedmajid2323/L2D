import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Alert,
  Image, 
  Pressable, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Chat_client = ({ route }) => {
  const { room, chat_user } = route.params;
  const [clientMsg, setClientMsg] = useState('');
  const [conversation, setConversation] = useState([]);


  const sendMessage = async () => {
    Alert.alert('warning','message clicked !!')
    /* if (clientMsg.trim()) {
      // Get the current authenticated user
      const currentUser = auth().currentUser;
      
      if (!currentUser) {
        console.error('No user is currently logged in');
        return;
      }
  
      // Prepare the message object
      const newMessage = {
        sender: currentUser.uid, // Use the current user's UID
        message: clientMsg,
        time: new Date(),
      };
  
      // Console log the new message to check if it's correct
      console.log("Message to send:", newMessage);
  
      try {
        // Get a reference to the room document using the roomId
        const roomRef = firestore().collection('rooms').doc(roomId);
  
        // Check if the room exists
        const roomDoc = await roomRef.get();
        
        if (!roomDoc.exists) {
          console.error(`Room with ID ${roomId} not found`);
          return;
        }
  
        // Update the messages field with the new message
        await roomRef.update({
          messages: firestore.FieldValue.arrayUnion(newMessage), // Add the message to the array
        });
  
        // Optionally, add the new message to local state for instant UI update
        setConversation((prev) => [
          ...prev,
          {
            sender: 'user',
            message: clientMsg,
            date: new Date(),
          },
        ]);
  
        // Clear the input field
        setClientMsg('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    
  }; */
  
};

  return (
    <LinearGradient 
      colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
      style={styles.linearGradient}>
      
      <View style={styles.mentor}>
        <Image source={require('../../../assets/mentor_man.png')} style={styles.mentorImage} />
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>{chat_user.name}</Text>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <View style={{ backgroundColor: 'green', width: 10, height: 10, borderRadius: 50 }} />
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>connected</Text>
          </View>
        </View>
      </View>
     

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 20 }}>
              {conversation.map((msg, index) => (
                <View key={index} style={{ alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: 7 }}>
                  <View style={{ maxWidth: '60%', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <View style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.adminBubble]}>
                      <Text style={{ color: msg.sender === 'user' ? 'black' : 'white' }}>
                        {msg.message}
                      </Text>
                    </View>
                    <View style={styles.timestamp}>
                      <Text style={styles.timestampText}>{msg.date.toLocaleDateString()} ,</Text>
                      <Text style={styles.timestampText}>{msg.date.toLocaleTimeString()}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput 
                onChangeText={(text) => setClientMsg(text)} 
                value={clientMsg}
                style={styles.input} 
                placeholder="Type your text here.." 
              />
              <Pressable disabled={!clientMsg} 
              onPress={sendMessage} style={styles.sendButton}>
                <Icon name='send' color='black' size={20} />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Chat_client;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  container: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    padding: 10,
    gap: 10,
  },
  mentor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    marginBottom: -25,
  },
  mentorImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 6,
  },
  userBubble: {
    backgroundColor: 'white',
  },
  adminBubble: {
    backgroundColor: 'red',
  },
  timestamp: {
    flexDirection: 'row',
    marginTop: -5,
    alignItems: 'center',
    gap: 2,
  },
  timestampText: {
    color: 'white',
    opacity: 0.5,
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  input: {
    width: '84%',
    backgroundColor: '#D9D9D9',
    borderRadius: 40,
    height: 40,
    paddingHorizontal: 20,
  },
  sendButton: {
    height: 40,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
  },
});
