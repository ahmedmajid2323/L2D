import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

const Calendar = () => {

  const DATA = [
    {
      title: '2024-11-23', // Date group
      data: [
        { name: 'Meeting with Team A', time: '10:00 AM' },
        { name: 'Call with Client', time: '2:00 PM' },
      ],
    },
    {
      title: '2024-11-24', // Date group
      data: [{ name: 'Submit Project Report', time: '12:00 PM' }],
    },
    {
      title: '2024-11-25',
      data: [{ name: 'Team Building Activity', time: '3:00 PM' }],
    },
  ];

  // Render each item in the agenda list
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  // Render each date header in the agenda list
  const renderSectionHeader = ({ section }) => {
    if (!section || !section.title) {
      return null; // Return nothing if the section or title is missing
    }
  
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title} hello</Text>
      </View>
    );
  };
  

  return (
    <CalendarProvider date={DATA[0].title}>
      <ExpandableCalendar />
      <AgendaList
        sections={DATA}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemTime: {
    fontSize: 14,
    color: 'gray',
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
});

export default Calendar;
