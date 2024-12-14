import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput, Pressable} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import Account_settings from './Account_settings'
import Hours_component from './Hours'
import Payment_comp from './Payment'

const Settings = () => {

  const user_credentiels = useSelector(state => state.client.client_credentiels)

  /*************************************************** settings ********************************************/
  const [Account, setAccount] = useState(false)
  const [Hours, setHours] = useState(false)
  const [Payment, setPayment] = useState(false)
  

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={{flex:1}}>

    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#153A54',paddingVertical:30,elevation:10,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10, paddingHorizontal:20}}>
            <View style={{flexDirection:'col',gap:2}}>
                <Text style={{color:'white',opacity:0.5,fontSize:17}}>Good to have you back</Text>
                <Text style={{color:'white',fontWeight:700,fontSize:25}}>{user_credentiels.name}</Text>
                <Text style={{color:'green',fontWeight:700}}>1520 XP</Text>
            </View>
            <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                <Image style={{width:45 , height: 45}} source={require('../../../assets/mentor_man.png')} />
            </View>
        </View>
    </View>

    {
      Account && (
        <Account_settings
        setAccount_fct={()=>setAccount(false)}
        />
      )
    }

    {
      Hours && (
        <Hours_component 
        setHours_fct={()=>setHours(false)}
        />
      )
    }

    {
      Payment && (
        <Payment_comp setpay_fct={()=>setPayment(false)} />
      )
    }

    {
     (!Account && !Hours && !Payment) && (
     
     <View style={{flexDirection:'column',gap:20,marginTop:50,marginHorizontal:10}} >

      <TouchableOpacity onPress={()=>setAccount(true)}
      style={{borderRadius:20,justifyContent:'space-between',flexDirection:'row',backgroundColor:'#153A54',elevation:10,alignItems:'center',padding:20}}>
        <Text style={{color:'white',fontWeight:600,fontSize:20}}>account settings</Text>
        <FontAwesome name='user' color='white' size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>setHours(true)}
      style={{borderRadius:20,justifyContent:'space-between',flexDirection:'row',backgroundColor:'#153A54',elevation:10,alignItems:'center',padding:20}}>
        <Text style={{color:'white',fontWeight:600,fontSize:20}}>hours & tests</Text>
        <Icons name='steering' color='white' size={25} />
      </TouchableOpacity>

      <TouchableOpacity 
      style={{borderRadius:20,justifyContent:'space-between',flexDirection:'row',backgroundColor:'#153A54',elevation:10,alignItems:'center',padding:20}}>
        <Text style={{color:'white',fontWeight:600,fontSize:20}}>dashboard</Text>
        <Icons name='monitor-dashboard' color='white' size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>setPayment(true)}
      style={{borderRadius:20,justifyContent:'space-between',flexDirection:'row',backgroundColor:'#153A54',elevation:10,alignItems:'center',padding:20}}>
        <Text style={{color:'white',fontWeight:600,fontSize:20}}>payment</Text>
        <FontAwesome5 name='coins' color='white' size={25} />
      </TouchableOpacity>

      <TouchableOpacity 
      style={{borderRadius:20,justifyContent:'space-between',flexDirection:'row',backgroundColor:'#088733',elevation:10,alignItems:'center',padding:20}}>
        <Text style={{color:'white',fontWeight:600,fontSize:20}}>1250 XP</Text>
        <Image style={{width:26 , height: 26}} source={require('../../../assets/icons/xp_icon.png')} />
      </TouchableOpacity>

    </View>)}

    </LinearGradient>
  )
}

export default Settings

const styles = StyleSheet.create({

})