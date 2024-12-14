import { StyleSheet, Text, View , Image , Pressable, TouchableOpacity, ScrollView, Linking, Alert} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import { LineChart, PieChart } from "react-native-gifted-charts";
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { filterAgenda_client } from '../../../redux/slices/Admin_slice';

const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('red')}
            <Text style={{color: 'white'}}>Conduite: 50H</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('black')}
            <Text style={{color: 'white'}}>Code: 40H</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('purple')}
            <Text style={{color: 'white'}}>Parking: 10H</Text>
          </View>
        </View>
      </>
    );
  };

const ProfileClient = ({route , navigation}) => {

  const { client } = route.params;

  const dispatch = useDispatch()
  const agenda = useSelector(state => state.admin.admin_agenda)

  const View_client_calendar = () =>{
    navigation.navigate('client_agenda' , {client})
  }

  const evaluation_data = [
      {value: 8, dataPointText: '8'}, 
      {value: 5, dataPointText: '5'}, 
      {value: 7, dataPointText: '7'}, 
      {value: 4, dataPointText: '4'}, 
      {value: 9, dataPointText: '9'}, 
      {value: 8, dataPointText: '8'}, 
      {value: 5, dataPointText: '5'}
  ];

  const pieData = [
    {
      value: 50,
      color: 'red',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {value: 40, color: 'black', gradientCenterColor: '#3BE9DE'},
    {value: 10, color: 'purple', gradientCenterColor: '#8F80F3'},
  ];

  const handleCall = (phoneNumber) =>{
    const url = `tel:${phoneNumber}`
    Linking.canOpenURL(url)
    .then((supported)=>{
      if (!supported) {
        Alert.alert('Error','phone calls are not supported on this devices')
      } else {
        Linking.openURL(url)
      }
    })
    .catch((error)=>console.log('error making phone call',error))
  }

  return (

    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

        <TouchableOpacity onPress={()=>navigation.navigate('home')}
        style={{flexDirection:'row',alignItems:'center',gap:5,padding:10,backgroundColor:'red',width:85,borderRadius:20}} >
          <AntDesign name='arrowleft' color='white' size={15} />
          <Text style={{fontWeight:700,color:'white'}}>return</Text>
        </TouchableOpacity>
      
        <View style={styles.profileContainer}>
            <ScrollView>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                <Image style={{width:50 , height:50}} source={require('../../../assets/user.png')}  />
                <View style={{flexDirection:'column',alignItems:'center',gap:10}}>
                    <Text style={{fontWeight:600, color:'#ffffff',fontSize:25}}>{client.name}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <Icon name='message-square' color='white' size={20} />
                        <Text style={{color:'white'}}>Send message</Text>
                    </View>
                </View>
            </View>
            
            <View style={{marginTop:20 , flexDirection:'column',gap:20}}>
                <View style={{width:'100%',gap:3}}>
                    <Text style={{color:'white',fontWeight:200}}>Email</Text>
                    <View style={{backgroundColor:'transparent',padding:10,borderRadius:10,borderWidth:1,borderColor:'red'}}>
                        <Text style={{fontWeight:700,color:'#ffffff'}}>{client.email}</Text>
                    </View>
                </View>
                <View style={{width:'100%',gap:3}}>
                    <Text style={{color:'white',fontWeight:200}}>Address</Text>
                    <View style={{backgroundColor:'transparent',padding:10,borderRadius:10,borderWidth:1,borderColor:'red'}}>
                        <Text style={{fontWeight:700,color:'#ffffff'}}>{client.address}</Text>
                    </View>
                </View>
                <View style={{gap:3}}>
                    <Text style={{color:'white',fontWeight:200}}>Phone</Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={{backgroundColor:'transparent',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10,borderWidth:1,borderColor:'red',width:'80%',borderRightWidth:0}}>
                            <Text style={{fontWeight:700,color:'#ffffff'}}>{client.phone}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>handleCall(client.phone)}
                        style={{padding:10 , borderTopRightRadius:10 , borderBottomRightRadius:10 , backgroundColor:'green',width:'20%',alignItems:'center'}}>
                            <Icon name='phone' size={20} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>View_client_calendar()}
                style={{backgroundColor:'red',padding:10,borderRadius:10,borderWidth:1,borderColor:'red',width:'100%',elevation:10}}>
                    <Text style={{fontWeight:700,color:'#ffffff',textAlign:'center'}}>See Calendar</Text>
                </TouchableOpacity>

                {/************************************************************************* Charts ***************************************************************/}

                <View style={{padding: 16,borderRadius: 10,borderWidth:1,borderColor:'red',alignItems:'center',backgroundColor:'#09202F'}}>
                    <View style={{borderBottomWidth:1, borderColor:'red',paddingBottom:20}}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',textAlign:'center'}}>
                            Lessons taken
                        </Text>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <PieChart
                            data={pieData}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            innerCircleColor={'#09202F'}
                            centerLabelComponent={() => {
                            return (
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                                    50H
                                    </Text>
                                    <Text style={{fontSize: 14, color: 'white'}}>Conduite</Text>
                                </View>
                            );
                            }}
                            />
                        </View>
                        {renderLegendComponent()}
                    </View>
                    <View style={{marginTop:20,paddingHorizontal:10,marginRight:20,alignItems:'center',gap:20}}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',textAlign:'center'}}>performance</Text>
                        <LineChart
                        width={250}
                        textColor1="white"
                        xAxisColor="#ffffff"
                        hideYAxisText
                        yAxisColor="#ffffff"
                        textShiftY={-8}
                        color={'#ffffff'} 
                        dataPointsColor={'#ffffff'}
                        thickness={3}
                        curved
                        spacing={40}
                        areaChart
                        data={evaluation_data}
                        startFillColor="rgb(255, 0, 0)"  
                        startOpacity={0.8}
                        endFillColor="rgb(255, 99, 71)" 
                        endOpacity={0.3}
                        />
                    </View>
                </View>
                
            </View>

            </ScrollView>

            <TouchableOpacity onPress={()=>navigation.navigate('new_lesson')}
            style={{backgroundColor:'#C00F0C',padding:10,borderRadius:20,marginTop:10}}>
                <Text style={{fontWeight:700,color:'#ffffff',textAlign:'center'}}>Start new lesson</Text>
            </TouchableOpacity>

            
        </View>

    </LinearGradient>
  )
}

export default ProfileClient

const styles = StyleSheet.create({
    screen:{
        padding: 10 ,
        flex:1
    },
    profileContainer:{
        borderRadius:20,
        flex:1,
        paddingHorizontal:20,
        paddingVertical:10,
    },
})