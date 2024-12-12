import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-gifted-charts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Hours_component = ({setHours_fct}) => {

    const heure_conduite = [
        {value: 80, color: 'red', gradientCenterColor: '#3BE9DE',focused:true},
        {value: 20, color: 'black', gradientCenterColor: '#8F80F3'},
      ];

  return (
    <View style={{flexDirection:'column',gap:20,marginTop:30,marginHorizontal:10}}>

        <Pressable onPress={()=>setHours_fct()} style={{marginLeft:10,marginBottom:5}} >
            <FontAwesome5 name='arrow-left' color='white' size={20} />
        </Pressable>

        <View style={{backgroundColor:'#153A54',elevation:10,borderRadius:20,paddingVertical:20,gap:20}}>

        <Text style={{color:'white',fontWeight:700,textAlign:'center',fontSize:20}}>code</Text>
        <View style={{flexDirection:'row',gap:10,paddingHorizontal:10}} >
            <PieChart
            donut
            showGradient
            innerRadius={35}
            innerCircleColor={'#153A54'}
            radius={52}
            data={[{value: 100, color: 'red'}]}
            centerLabelComponent={() => {
                return <Text style={{fontSize: 10,color:'white',fontWeight:700}}>70 H</Text>;
            }}
            />
            <View style={{borderRadius:20,borderWidth:1,borderColor:'red',padding:10,gap:5,width:208}}>
            <Text style={{color:'red',fontWeight:700}}>Date examen :<Text style={{color:'white',fontWeight:200}}> 15/10/2024 </Text></Text>
            <View style={{flexDirection:'row',gap:10,alignItems:'center',flexWrap:'wrap'}}>
                <Text style={{color:'white',fontWeight:200}}>ariana , centre d'examen de conduite</Text>
            </View>
            <Text style={{color:'red',fontWeight:700}}>Days left : <Text style={{color:'white',fontWeight:200}}> xxx days </Text></Text>
            </View>
        </View>
        
        </View>

        <View style={{backgroundColor:'#153A54',elevation:10,borderRadius:20,padding:20,gap:20}}>

        <Text style={{color:'white',fontWeight:700,textAlign:'center',fontSize:20}}>conduite</Text>
        <View style={{flexDirection:'row',gap:10}}>
            <View style={{alignItems:'center',gap:10}}>
            <PieChart
                data={heure_conduite}
                donut
                showGradient
                sectionAutoFocus
                radius={50}
                innerRadius={35}
                innerCircleColor={'#153A54'}
                centerLabelComponent={() => {
                return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 10, color: 'white', fontWeight: 'bold'}}> 47 H </Text>
                    <Text style={{fontSize: 10, color: 'white'}}>conduite</Text>
                    </View>
                );
                }}
            />
            <View style={{flexDirection:'row',gap:10}}>
                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                <View style={{borderRadius:50,backgroundColor:'red',width:7,height:7}} />
                <Text style={{color:'white',fontWeight:'light',fontSize:10}}>conduite</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                <View style={{borderRadius:50,backgroundColor:'black',width:7,height:7}} />
                <Text style={{color:'white',fontWeight:'light',fontSize:10}}>parking</Text>
                </View>
            </View>
            </View>
            <View style={{borderRadius:20,borderWidth:1,borderColor:'red',padding:10,gap:5,width:190,justifyContent:'center'}}>
            <Text style={{color:'red',fontWeight:700}}>Date examen :<Text style={{color:'white',fontWeight:200}}> 15/10/2024 </Text></Text>
            <View style={{flexDirection:'row',gap:10,alignItems:'center',flexWrap:'wrap'}}>
                <Text style={{color:'white',fontWeight:200}}>ariana , centre d'examen de conduite</Text>
            </View>
            <Text style={{color:'red',fontWeight:700}}>Days left : <Text style={{color:'white',fontWeight:200}}> xxx days </Text></Text>
            </View>
        </View>

        </View>

    </View>
  )
}

export default Hours_component

const styles = StyleSheet.create({})