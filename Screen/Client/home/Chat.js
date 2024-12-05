import { 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    Image, 
    Pressable, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    Keyboard, 
    TouchableWithoutFeedback 
  } from 'react-native';
  import React, { useState } from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  
  const Chat_client = ({ navigation }) => {
    const [clientMsg, setClientMsg] = useState('');
    const [Conversation, setConversation] = useState([]);
  
    const sendMessage = () => {
      if (clientMsg.trim()) {
        setConversation((prev) => [
          ...prev,
          {
            sender: 'user',
            message: clientMsg,
            date: new Date(),
          },
        ]);
        setClientMsg('');
      }
    };
  
    return (
      <LinearGradient 
        colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
        style={styles.linearGradient}>

        <View style={styles.mentor}>
            <Image source={require('../../../assets/mentor_man.png')} />
            <View style={{ flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>Name mentor 1</Text>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View 
                    style={{ backgroundColor: 'green', width: 10, height: 10, borderRadius: 50 }} />
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>connected</Text>
                </View>
            </View>
        </View>
  
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
  
              <ScrollView 
                style={styles.chatContainer} 
                contentContainerStyle={{ paddingBottom: 20 }}>
                {Conversation.map((msg, index) => (
                  <View 
                    key={index} 
                    style={{ alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: 7 }}>
                    <View style={{ maxWidth: '60%', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                      <View 
                        style={[
                          styles.messageBubble, 
                          msg.sender === 'user' ? styles.userBubble : styles.adminBubble
                        ]}>
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
                  placeholder="Type your text here.." />
                <Pressable onPress={sendMessage} style={styles.sendButton}>
                  <Image 
                    style={styles.sendIcon} 
                    source={require('../../../assets/icons/send.png')} />
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
      padding:10,
      borderRadius: 15,
      marginBottom:-25
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
    sendIcon: {
      width: 20,
      height: 20,
    },
  });
  