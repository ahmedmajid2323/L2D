import { StyleSheet, Text, View , Image, Modal, Pressable, TouchableWithoutFeedback, ScrollView} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Circuits = ({navigation}) => {

  const [Modal_calendar, setModal_calendar] = useState(false)
  const [Selected_date, setSelected_date] = useState(new Date().toLocaleDateString())

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={{flex:1,paddingVertical:20,paddingHorizontal:10}}>

      <Text style={{fontSize:30,fontWeight:700,color:'white',marginLeft:10}}>Lessons :</Text>

      <ScrollView style={{marginTop:20}}>

        { Array.from({length:8} , (_ , index)=>(
          <View key={index} style={styles.box}>
            <View>
              <Image style={{width:140,height:130,borderRadius:20,opacity:0.4}} source={require('../../../assets/bg_lesson.png')} />
              <Text style={{fontSize:15,fontWeight:700,color:'white',position:'absolute',bottom:'40%',left:'17%'}}>{Selected_date}</Text>
            </View>
            <View style={{flexDirection:'column',gap:7}}>
              <View style={{flexDirection:'row',gap:20}}>
                <View style={{backgroundColor:'#C5D741',padding:10,borderRadius:20,height:35}}>
                  <Text style={{color:'#000B14',fontWeight:600,fontSize:10}}>(5) Warnings</Text>
                </View>
                <View style={{backgroundColor:'#D74141',padding:10,borderRadius:20,height:35}}>
                <Text style={{color:'white',fontWeight:600,fontSize:10}}>(5) Errors</Text>
                </View>
              </View>

              <View style={{backgroundColor:'white',padding:10,borderRadius:20}}>
                <Text style={{textAlign:'center',color:'#000B14',fontWeight:700}}>Evaluation: 7/10</Text>
              </View>

              <Pressable onPress={()=>navigation.navigate('map_details')}
              style={{backgroundColor:'white',padding:10,borderRadius:20,elevation:5}}>
                <Text style={{textAlign:'center',color:'#000B14',fontWeight:700}}>See details</Text>
              </Pressable>
            </View>
          </View>
        ))
          }

      </ScrollView>

      {/* <Modal visible={Modal_calendar} transparent>
        <TouchableWithoutFeedback onPress={()=>setModal_calendar(false)}>
        <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
          <View style={{width:'80%',height:'50%',backgroundColor:'white',borderRadius:20,elevation:10}}>

              <Calendar 
              onDayPress={day => {
                setSelected_date(day.dateString);
              }}
              markedDates={{
                [Selected_date]: {selected: true, marked: true, selectedColor: '#153A54'},
              }}
              style={{borderRadius:20 , borderBottomWidth: 1,borderColor:'#11324A'}} />
              <View style={{marginTop:17,alignItems:'center'}}>
                <Pressable onPress={()=>setModal_calendar(false)}
                style={{elevation:10,backgroundColor:'#153A54',borderRadius:50,padding:5,justifyContent:'center',alignItems:'center',width:100}}>
                  <Text style={{color:'white',fontWeight:600}}>OK</Text>
                </Pressable>
              </View>

          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      
    </LinearGradient>
  )
}

export default Circuits

const styles = StyleSheet.create({
  box:{
    flexDirection:'row',
    gap:10,
    borderWidth:1,
    borderRadius:20,
    borderColor:'gray',
    padding:10,
    marginBottom:20
  }
})