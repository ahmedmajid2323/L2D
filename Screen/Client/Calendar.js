import React, { useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { format } from 'date-fns';

const Calendar = () => {

  const today = new Date();
  const date_aujourdhui = format(today, 'yyyy-MM-dd');

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
        { name: 'Meeting with Team A', time: '10:00 AM' },
        { name: 'Call with Client', time: '9:00 PM' },
      ],
    },
    {
      title: '2024-12-06', // Date group
      data: [{ name: 'Submit Project Report', time: '12:00 PM' }],
    },
    {
      title: '2024-12-07',
      data: [{ name: 'Team Building Activity', time: '3:00 PM' }],
    },
  ];

  const [Filtred_data, setFiltred_data] = useState(
    DATA.filter(day => day.title === date_aujourdhui)
  )
  

  // Render each item in the agenda list
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={{borderBottomWidth:1 , borderColor:'red',paddingBottom:10}} >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemTime}>{item.time}</Text>
      </View>
      <View style={{alignItems:'flex-end',paddingTop:10}} >
        <Image style={{width:25 , height:30}} source={require('../../assets/icons/location.png')} />
      </View>
    </TouchableOpacity>
  );

 /*  // Render each date header in the agenda list
  const renderSectionHeader = ({ section }) => {
    console.log('this is section',section)
    if (!section || !section.title) {
      return null; // Return nothing if the section or title is missing
    }
  
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title} hello</Text>
      </View>
    );
  }; */
  

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

      <CalendarProvider
      onDateChanged={(date)=>handleDateChange(date)}
      style={{backgroundColor:'transparent'}}
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
        />

      </CalendarProvider>
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
  itemName: {
    fontSize: 16,
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
    marginVertical:10
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
});

export default Calendar;
