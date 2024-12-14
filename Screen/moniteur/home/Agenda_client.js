import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, TextInput, Pressable } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { format } from 'date-fns';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { addTask_state } from '../../../redux/slices/Admin_slice';

const Agenda_client = ({route , navigation}) => {

  const { client } = route.params;

  const dispatch = useDispatch()
  const admin = useSelector(state=>state.admin.admin_credentiels)
  const client_agenda = useSelector(state => state.admin.admin_agenda)

  const [Loading, setLoading] = useState(false)

  const today = new Date();
  const date_aujourdhui = format(today, 'yyyy-MM-dd');
  const [Selected_date, setSelected_date] = useState(date_aujourdhui)
  const [task, settask] = useState()
  const [lesson, setlesson] = useState()

  const [modal_state, setmodal_state] = useState(false)
  const [show, setShow] = useState(false);
  const [Time, setTime] = useState(new Date());

  const [Clients, setClients] = useState([])
  useEffect(() => {
    let isMounted = true;
    const fetchClients = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('users')
          .where('name', '==', client.name)
          .get();
        if (isMounted) {
          const clientsData = querySnapshot.docs.map(doc => doc.data());
          setClients(clientsData);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();

    return () => {
      isMounted = false;
    };
  }, []);

  const [Selected_client, setSelected_client] = useState()
  
  const lesson_type = [
    {type: 'conduite'},
    {type: 'code'},
  ];

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || Time;
    setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
    setTime(currentTime); // Update the selected time
  };

  const [markedDates, setMarkedDates] = useState({});
  const [Filtred_data, setFiltred_data] = useState([{ title: Selected_date, data: [] }]);

  useEffect(() => {
    console.log('useeffect trigered !!')

    const todayFiltered = client_agenda.filter((day) => day.title === Selected_date);
    setFiltred_data(todayFiltered.length > 0 ? todayFiltered : [{ title: Selected_date, data: [] }]);
    const marked_dates = client_agenda.map((day) => {
        if (day.data.length > 0) {
            return {
                [day.title]: {
                    selected: true,
                    selectedColor: 'red',
                    selectedTextColor: '#ffffff',
                },
            };
        }
        return null; 
    }).filter((item) => item !== null);

    const formattedObject = marked_dates.reduce((acc, item) => {
        const key = Object?.keys(item)[0];
        acc[key] = item[key];
        return acc;
    }, {});
    setMarkedDates(formattedObject)

  }, [client_agenda]);
  
  const handleDateChange = (date) => {
    setSelected_date(date)
    const filtered = client_agenda.filter((day) => day.title === date);
    setFiltred_data(filtered.length > 0 ? filtered : [{ title: date, data: [] }]);
  }

  const add_new_task = ()=>{
    if (!Selected_client || !task || !lesson ) {
      Alert.alert('warning','all fields are required')
    } else  {
      setLoading(true)

      dispatch(addTask_state({
        title: Selected_date,
        data: {
            task,
            admin: admin.name ,
            time: Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            lesson: lesson.type,
        },
      }))

      /***************************************** add task to admin *****************************************/

      firestore()
      .collection('users')
      .where('email', '==', admin.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const docRef = firestore().collection('users').doc(doc.id);

          const docData = (await docRef.get()).data();
          const agenda = docData.agenda || [];

          const titleIndex = agenda.findIndex(item => item.title === Selected_date);

          if (titleIndex >= 0) {
            // If title exists, update the specific item
            agenda[titleIndex].data.push({
              task,
              user: {
                name: Selected_client.name,
                phone: Selected_client.phone,
                address: Selected_client.address,
              },
              time: Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              lesson: lesson.type,
            });
          } else {
            // If title does not exist, add a new item
            agenda.push({
              title: Selected_date,
              data: [{
                task,
                user: {
                  name: Selected_client.name,
                  phone: Selected_client.phone,
                  address: Selected_client.address,
                },
                time: Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                lesson: lesson.type,
              }],
            });
          }

          // Update the document in Firestore
          docRef.update({ agenda })
            .then(() => {
              console.log('Agenda updated successfully for admin!')
              setmodal_state(false),
              settask(''),
              setSelected_client()
              setTime(new Date())
              setlesson()
            })
            .catch((error) => console.error('Error updating agenda:', error));
        });
      })
      .catch((error) => console.error('Error fetching users:', error));

      /***************************************** add task to client *****************************************/

      firestore()
      .collection('users')
      .where('email', '==', Selected_client?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const docRef = firestore().collection('users').doc(doc.id);

          const docData = (await docRef.get()).data();
          const agenda = docData.agenda || [];

          const titleIndex = agenda.findIndex(item => item.title === Selected_date);

          if (titleIndex >= 0) {
            // If title exists, update the specific item
            agenda[titleIndex].data.push({
              task,
              admin: admin.name ,
              time: Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              lesson: lesson.type,
            });
          } else {
            // If title does not exist, add a new item
            agenda.push({
              title: Selected_date,
              data: [{
                task,
                admin: admin.name ,
                time: Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                lesson: lesson.type,
              }],
            });
          }

          // Update the document in Firestore
          docRef.update({ agenda })
            .then(() => {
              console.log('Agenda updated successfully for client!')
              setmodal_state(false),
              settask(''),
              setSelected_client()
              setTime(new Date())
              setlesson()
              setLoading(false)
            })
            .catch((error) => console.error('Error updating agenda:', error));
        });
      })
      .catch((error) => console.error('Error fetching users:', error));

    }
  }
  
  // Render each item in the agenda list
  const renderItem = ({ item }) => (
    
    <View 
    style={{
    zIndex:0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    elevation:10,
    backgroundColor:'#051622',
    opacity: 1,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10}}>
        <View style={{borderBottomWidth:1 , borderColor:'red',paddingBottom:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
        <View>
            <Text style={styles.itemTask}>{item.task}</Text>
            <Text style={styles.itemName}>{client.name}</Text>
        </View>
        <View style={{flexDirection:'column',alignItems:'center'}} >
            <Text style={styles.itemTime}>{item.time}</Text>
            <Text style={styles.itemTime}>{item.lesson}</Text>
        </View>
        </View>
        <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
        <View style={{backgroundColor:'red',padding:10,borderRadius:20}}>
            <Text style={styles.local}>call: <Text style={{textDecorationLine:'underline'}}>{client.phone}</Text></Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:10}} >
            <Text style={styles.local}>{client.address}</Text>
            <Image style={{width:25 , height:30}} source={require('../../../assets/icons/location.png')} />
        </View>
        </View>
    </View>
      
    );

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

      <View style={{padding:20,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Pressable onPress={()=>navigation.navigate('profile' , {client})}
        style={{flexDirection:'row',alignItems:'center',gap:5}} >
            <AntDesign name='arrowleft' color='#153A54' size={20} />
            <Text style={{fontWeight:700,color:'#153A54'}}>return</Text>
        </Pressable>
        <Text style={{fontWeight:700,color:'#153A54'}}>{client.name}</Text>
      </View>

      <CalendarProvider
      onDateChanged={(date)=>handleDateChange(date)}
      style={{backgroundColor:'transparent',zIndex:1}}
      date={date_aujourdhui}>
        <ExpandableCalendar markedDates={markedDates}/>
        <AgendaList
          sections={Filtred_data}
          renderItem={renderItem}
          renderSectionHeader={ (section)  => (
            <View style={styles.sectionHeader}>
              <View style={styles.line1} />
              <Text style={styles.sectionHeaderText}>{section}</Text>
              <View style={styles.line2} />
            </View>
          )}
          sectionStyle={styles.section}
          stickySectionHeadersEnabled={false}
        />
      </CalendarProvider>

      <View style={{position:'absolute',bottom:20,zIndex:10,right:20}}>
        <TouchableOpacity onPress={()=>{
          if (!Selected_date) {
            Alert.alert('Date required !','please select a date then add your new task.')
          } else {
            setmodal_state(true)
          }
        }}
        style={{backgroundColor:'red',width:50,height:50,borderRadius:50,alignItems:'center',justifyContent:'center',elevation:10}} >
          <AntDesign name='pluscircleo' color='white' size={30} />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modal_state} animationType='fade' >
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'center',alignItems:'center'}} >
          <View style={{padding:10,backgroundColor:'#051622',borderRadius:10,borderWidth:1,borderColor:'red'}}>

            <View style={{borderBottomColor:'red', paddingBottom:10,borderBottomWidth:1,flexDirection:'row',gap:45}} >
              <View style={{gap:10}}>
                <TextInput onChangeText={(text)=>settask(text)}
                style={{borderRadius:10,height:40,width:150,backgroundColor:'white',paddingHorizontal:10}} placeholder='task..' />
                <SelectDropdown
                  data={Clients}
                  onSelect={(selectedItem, index) => {
                    setSelected_client((Clients.filter(client=> client.email === selectedItem.email))[0])              
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.name) || 'client'}
                        </Text>
                        <Image source={require('../../../assets/icons/blackArrow.png')} style={{height:12 , width:12,transform:[{rotate:'-90deg'}]}}/>
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                /> 
              </View>
              <View style={{gap:10}}>
                <Pressable onPress={()=>setShow((true))}
                style={{backgroundColor:'white',padding:10,borderRadius:10,height:40,width:120,}}>
                  <Text style={{color:'balck',fontWeight:700}} >{Time ? Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'time'}</Text>
                </Pressable>
                <SelectDropdown
                  data={lesson_type}
                  onSelect={(selectedItem, index) => {
                    setlesson(selectedItem)              
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle2}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.type) || 'lesson'}
                        </Text>
                        <Image source={require('../../../assets/icons/blackArrow.png')} style={{height:12 , width:12,transform:[{rotate:'-90deg'}]}}/>
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.type}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                /> 
              </View>
              
            </View>
            <View style={{marginTop:10,justifyContent:'space-between',flexDirection:'row'}} >
              <TextInput value={Selected_client?.phone}
              editable={false} style={{borderRadius:10,height:40,width:150,backgroundColor:'white',paddingHorizontal:10}} placeholder='phone' />
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput value={Selected_client?.address}
                editable={false} style={{borderRadius:10,height:40,width:150,backgroundColor:'white',paddingHorizontal:10}} placeholder='location' />
                <Image style={{width:25 , height:30,position:'absolute',marginLeft:120}} source={require('../../../assets/icons/location.png')} />
              </View>
              
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20,gap:20}} >
              <TouchableOpacity onPress={add_new_task}
              style={{padding:10,borderRadius:10,backgroundColor:'white',borderWidth:1,borderColor:'red'}} >
                <Text style={{color:'red'}} >Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                setmodal_state(false),
                settask(''),
                setSelected_client()
                setTime(new Date())
                setlesson()
              }}
              style={{padding:10,borderRadius:10,backgroundColor:'white',borderWidth:1,borderColor:'red'}}>
                <Text style={{color:'red'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            

          </View>
        </View>
      </Modal>

      {show && (
        <DateTimePicker
          value={Time}
          is24Hour={false} // Use 12-hour clock (AM/PM)
          mode="time" // 'date', 'time', or 'datetime'
          display="clock" // 'default', 'spinner', 'calendar', or 'clock'
          onChange={onChange}
        />
      )}

      <Modal transparent visible={Loading} animationType='fade' >
              <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex:1,justifyContent:'center',alignItems:'center'}} >
                  <LottieView style={{width:300,height:280}} source={require('../../../assets/loading.json')} autoPlay loop />
              </View>
      </Modal>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    borderWidth:1,
    borderColor:'red',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  itemTask: {
    fontSize: 16,
    fontWeight: '600',
    color:'white'
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color:'white',
  },
  local: {
    fontSize: 12,
    fontWeight: '600',
    color:'white'
  },
  itemTime: {
    fontSize: 14,
    color: 'lightgray',
  },
  sectionHeader: {
    padding: 10,
    alignItems:'center',
    flexDirection:'row',
    gap:5,
    marginVertical:10,
    zIndex:0
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color:'white'
  },
  section: {
    marginBottom: 20,
  },
  screen:{
    flex:1 , 
  },
  line1:{
    borderWidth:1,
    borderColor:'red',
    width:50  
  },
  line2:{
    borderWidth:1,
    borderColor:'red',
    width:170  
  },
  dropdownButtonStyle: {
    width: 150,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonStyle2: {
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default Agenda_client;
