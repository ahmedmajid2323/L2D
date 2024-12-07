import React, { useEffect, useState } from 'react';
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

const Agenda = () => {

  const today = new Date();
  const date_aujourdhui = format(today, 'yyyy-MM-dd');
  const [modal_state, setmodal_state] = useState(false)
  const [show, setShow] = useState(false);
  const [Time, setTime] = useState(new Date());
  const Clients = [
    {name: '2024'},
    {name: '2025'},
    {name: '2026'},
    {name: '2027'},
    {name: '2028'},
    {name: '2029'},
    {name: '2030'},
    {name: '2031'},
    {name: '2032'},
  ];
  const lesson_type = [
    {type: 'conduite'},
    {type: 'code'},
  ];

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || Time;
    setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
    setTime(currentTime); // Update the selected time
  };

  const [markedDates, setMarkedDates] = useState({
    '2024-12-05': {
      selected: true,
      selectedColor: 'red',  
      selectedTextColor: '#ffffff',
    },
    '2024-12-06': {
      selected: true,
      selectedColor: 'red',  
      selectedTextColor: '#ffffff',
    },
    '2024-12-07': {
      selected: true,
      selectedColor: 'red',  
      selectedTextColor: '#ffffff',
    },
  });

  const handleDateChange = (date) => {
    const filtered = DATA.filter(day => day.title === date);
    setFiltred_data(filtered.length > 0 ? filtered : [{ title: date, data: [] }]);
  }

  const DATA = [
    {
      title: '2024-12-05', // Date group
      data: [
        { task: 'Meeting with Team A',name:'ahmed majid salhi', time: '10:00 AM', 'deleted': false },
        { task: 'Call with Client',name:'aziz khadhraoui', time: '9:00 PM' , 'deleted': false },
      ],
    },
    {
      title: '2024-12-06', // Date group
      data: [
        { task: 'Submit Project Report',name:'youssef boujmil', time: '12:00 PM', 'deleted': false  },
        { task: 'Submit Project Report',name:'sahar guebsi', time: '15:00 PM', 'deleted': false  },
      ],
    },
    {
      title: '2024-12-07',
      data: [{ task: 'Team Building Activity',name:'rim barnat', time: '3:00 PM' , 'deleted': false }],
    },
  ];

  const [Filtred_data, setFiltred_data] = useState(
    DATA.filter(day => day.title === date_aujourdhui)
  )

  const handleSwipeableOpen = (item) => {
    const updatedData = Filtred_data.map(group => {
      return {
        ...group, 
        data: group.data.map(elt => {
          if (elt.task === item.task && elt.time === item.time) {
            return { ...elt, deleted: true }; 
          }
          return elt; 
        }),
      };
    });
    setFiltred_data(updatedData); 
  };
  
  // Render each item in the agenda list
  const renderItem = ({ item }) => (
    !item.deleted &&
      (<GestureHandlerRootView>
      <ReanimatedSwipeable
      onSwipeableOpen={()=>handleSwipeableOpen(item)}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={()=>(
        <View style={{backgroundColor:'red',flex:1,overflow:'hidden',borderRadius:10,padding:10,marginHorizontal:10,marginBottom:10,alignItems:'flex-end',paddingHorizontal:20,justifyContent:'center'}}>
          <Icon name='delete-sweep' color='white' size={50} />
        </View>
      )}>
        <Reanimated.View 
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'red',
          elevation:10,
          backgroundColor:'#051622',
          opacity: 1,
          padding: 10,
          marginBottom: 10,
          marginHorizontal: 10,
        }}>
          <View style={{borderBottomWidth:1 , borderColor:'red',paddingBottom:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
            <View>
              <Text style={styles.itemTask}>{item.task}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <View style={{flexDirection:'column',alignItems:'center'}} >
              <Text style={styles.itemTime}>{item.time}</Text>
              <Text style={styles.itemTime}>(conduite)</Text>
            </View>
          </View>
          <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
            <View style={{backgroundColor:'red',padding:10,borderRadius:20}}>
              <Text style={styles.local}>call: <Text style={{textDecorationLine:'underline'}}>29 325 652</Text></Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}} >
              <Text style={styles.local}>Jardin d'el menzah 2</Text>
              <Image style={{width:25 , height:30}} source={require('../../assets/icons/location.png')} />
            </View>
          </View>
        </Reanimated.View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>)
  
  );

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

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

      <View style={{alignItems:'flex-end',marginHorizontal:20}}>
        <TouchableOpacity onPress={()=>setmodal_state(true)}
        style={{backgroundColor:'red',width:50,height:50,borderRadius:50,alignItems:'center',justifyContent:'center',elevation:10}} >
          <AntDesign name='pluscircleo' color='white' size={30} />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modal_state} animationType='fade' >
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'center',alignItems:'center'}} >
          <View style={{padding:10,backgroundColor:'#051622',borderRadius:10,borderWidth:1,borderColor:'red'}}>

            <View style={{borderBottomColor:'red', paddingBottom:10,borderBottomWidth:1,flexDirection:'row',gap:45}} >
              <View style={{gap:10}}>
                <TextInput style={{borderRadius:10,height:40,width:150,backgroundColor:'white',paddingHorizontal:10}} placeholder='task..' />
                <SelectDropdown
                  data={Clients}
                  onSelect={(selectedItem, index) => {
                    setCurrentYear(selectedItem.name)              
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.name) || 'client'}
                        </Text>
                        <Image source={require('../../assets/icons/blackArrow.png')} style={{height:12 , width:12,transform:[{rotate:'-90deg'}]}}/>
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
                    setCurrentYear(selectedItem.type)              
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle2}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.type) || 'lesson'}
                        </Text>
                        <Image source={require('../../assets/icons/blackArrow.png')} style={{height:12 , width:12,transform:[{rotate:'-90deg'}]}}/>
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
              <TextInput 
              editable={false} style={{borderRadius:10,height:40,width:150,backgroundColor:'white',paddingHorizontal:10}} placeholder='phone' />
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput 
                editable={false} style={{borderRadius:10,height:40,width:150,backgroundColor:'white',paddingHorizontal:10}} placeholder='location' />
                <Image style={{width:25 , height:30,position:'absolute',marginLeft:120}} source={require('../../assets/icons/location.png')} />
              </View>
              
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20,gap:20}} >
              <TouchableOpacity style={{padding:10,borderRadius:10,backgroundColor:'white',borderWidth:1,borderColor:'red'}} >
                <Text style={{color:'red'}} >Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setmodal_state(false)}
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

export default Agenda;
