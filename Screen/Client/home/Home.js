import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import Icon_logout from 'react-native-vector-icons/SimpleLineIcons';
import {setUser_type} from '../../../redux/slices/typeSlice';
import firestore from '@react-native-firebase/firestore'; // Ensure this import is added for Firestore usage
import {useNavigation} from '@react-navigation/native'; // Add this import for navigation

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const currentUser = auth().currentUser;
  const user_credentiels = useSelector(
    state => state.client.client_credentiels,
  );

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [categories, setcategories] = useState([
    {name: 'all courses', clicked: true},
    {name: 'my Mentors', clicked: false},
    {name: 'daily goals', clicked: false},
  ]);

  // Fetch all users and rooms in real-time
  useEffect(() => {
    const unsubscribeUsers = firestore()
      .collection('users')
      .where('type','==','admin')
      .onSnapshot(snapshot => {
        const userList = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(userList);
        console.log('Users updated:', userList);
      });

    const unsubscribeRooms = firestore()
      .collection('rooms')
      .onSnapshot(snapshot => {
        const roomList = snapshot.docs.map(doc => {
          const roomData = doc.data();
          roomData.messages = roomData.messages || [];
          return {
            ...roomData,
            id: doc.id,
          };
        });
        setRooms(roomList);
        console.log('Rooms updated:', roomList);
      });

    return () => {
      unsubscribeUsers();
      unsubscribeRooms();
    };
  }, []);

  // Generate room ID for two users
  const generateRoomId = (user1Id, user2Id) => {
    // Ensure user IDs are sorted, so the format is always user1_user2
    const ids = [user1Id, user2Id].sort();
    return `${ids[0]}_${ids[1]}`;
  };

  const handleChat_click = (mentor)=>{
    const room_id = generateRoomId(mentor.id , user_credentiels.uid)
    firestore()
      .collection('rooms')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === room_id ){
            navigation.navigate('chat',{room :room_id , chat_user: mentor})
          }else{
            firestore()
              .collection('rooms')
              .doc(room_id)
              .set({
                messages: [],
                participants: [mentor.id , user_credentiels.uid],
              })
              .then(() => {
                console.log('Room added!');
              });
            navigation.navigate('chat',{room :room_id , chat_user: mentor})
          }
        });
  });
  }

  // Handle user click to navigate or create a room
  const handleUserClick = async user2 => {
    const user1Id = currentUser.uid; // Current user's ID
    const user2Id = user2.id; // ID of the other user
    const roomId = generateRoomId(user1Id, user2Id); // Generate the room ID

    // Check if the room already exists
    const existingRoom = rooms.find(
      room =>
        room.participants.includes(user1Id) &&
        room.participants.includes(user2Id),
    );

    if (existingRoom) {
      console.log('Navigating to existing room:', existingRoom);
      navigation.navigate('chat', {
        roomId,
        userId: user2Id,
        messages: existingRoom.messages,
      });
    } else {
      try {
        // Create a new room if it doesn't exist
        const newRoomRef = await firestore()
          .collection('rooms')
          .add({
            name: `Room between ${user1Id} and ${user2Id}`,
            participants: [user1Id, user2Id],
            messages: [],
          });

        console.log('Room created successfully:', newRoomRef.id);
        navigation.navigate('chat', {
          roomId: newRoomRef.id,
          userId: user2Id,
          messages: [],
        });
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  };

  const handleCategorie = i => {
    setcategories(
      categories.map((item, index) => {
        if (index == i) {
          return {...item, clicked: true};
        } else {
          return {...item, clicked: false};
        }
      }),
    );
  };


  const handleCall = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'phone calls are not supported on this devices');
        } else {
          Linking.openURL(url);
        }
      })
      .catch(error => console.log('error making phone call', error));
  };

  const handleLogout = () => {
    auth().signOut();
    dispatch(setUser_type(''));
  };

  return (
    <LinearGradient
      colors={[
        '#000B14',
        '#020F19',
        '#051622',
        '#09202F',
        '#11324A',
        '#153A54',
      ]}
      style={styles.linearGradient}>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderColor: 'red',
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 20,
          }}
          onPress={handleLogout}>
          <Icon_logout name="logout" size={15} color="white" />
          <Text style={{color: 'white', fontWeight: 700, fontSize: 10}}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: -20,
        }}>
        <View style={{flexDirection: 'col', gap: 2}}>
          <Text style={{color: 'white', opacity: 0.5, fontSize: 17}}>
            Welcome
          </Text>
          <Text style={{color: 'white', fontWeight: 700, fontSize: 25}}>
            {user_credentiels.name}
          </Text>
          <Text style={{color: 'green'}}>1520 XP</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Image source={require('../../../assets/user.png')} />
        </View>
      </View>

      <View style={{minHeight: 32}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 10,
          }}>
          {categories.map((item, i) => (
            <Pressable
              key={i}
              onPress={() => handleCategorie(i)}
              style={{
                backgroundColor: item.clicked ? 'red' : 'white',
                padding: 5,
                paddingHorizontal: 8,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: item.clicked ? 'white' : '#153A54',
                  fontWeight: 700,
                }}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {categories.map(categorie => {
        if (categorie.clicked) {
          if (categorie.name === 'all courses') {
            return (
              <>
                {/******************************************************** Courses Section ******************************************************/}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 50,
                      padding: 10,
                      zIndex: 0,
                      width: '100%',
                      paddingHorizontal: 20,
                    }}
                    placeholder="search courses here..."
                  />
                  <Icon
                    name="search"
                    color="black"
                    size={20}
                    style={{position: 'relative', left: -40, zIndex: 1}}
                  />
                </View>

                <ScrollView>
                  <View style={styles.container}>
                    {Array.from({length: 8}, (_, index) => (
                      <View key={index} style={styles.square}>
                        <Text style={styles.text}>box n°{index + 1}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </>
            );
          } else if (categorie.name === 'my Mentors') {
            return (
              <>
                {/******************************************************** Mentors Section ******************************************************/}
                {/** Mentors Section */}
                <ScrollView
                  key={categorie.name}
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: 'column',
                    gap: 20,
                  }}>
                  {users.map((mentor, index) => {
                    return (
                      <View key={index} style={styles.box_mentor}>
                        <Image source={require('../../../assets/mentor_man.png')} />
                        <View style={{flexDirection: 'col', gap: 20}}>
                          <Text style={styles.mentor_name}>{mentor.name}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 20,
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              marginRight: 10,
                            }}>
                            <Pressable
                              onPress={() => handleCall(mentor.phone_num)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Icon name="phone" color="white" size={20} />
                              <Text style={{color: 'white'}}>call</Text>
                            </Pressable>

                            {/** Message Button: Navigate to Chat with the Room ID and Mentor's User Info */}
                            <Pressable
                              onPress={() => handleChat_click(mentor) }
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Icon
                                name="message-square"
                                color="white"
                                size={20}
                              />
                              <Text style={{color: 'white'}}>message</Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </>
            );
          } else if (categorie.name === 'daily goals') {
            return (
              <>
                {/******************************************************** Daily goals Section ******************************************************/}
                <Text key={categorie.name} style={{color: 'white'}}>
                  hello in daily goals section
                </Text>
              </>
            );
          }
        }
        return null; // Return null if no conditions match
      })}
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingTop: 10,
    gap: 30,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap to the next row when line is full
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  square: {
    width: '48.5%',
    height: '48%',
    aspectRatio: 1, // Ensure squares remain squares
    backgroundColor: '#4CAF50',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  box_mentor: {
    padding: 25,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  mentor_name: {
    fontSize: 20,
    color: 'white',
    marginRight: 20,
  },
});
