import { StyleSheet, Text, View , Pressable} from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'

const Payment_comp = ({setpay_fct}) => {
  return (
    <View style={{flexDirection:'column',gap:20,marginTop:30,marginHorizontal:10}}>
        <Pressable onPress={()=>setpay_fct()} style={{marginLeft:10,marginBottom:5}} >
            <FontAwesome5 name='arrow-left' color='white' size={20} />
        </Pressable>

        <View style={{flexDirection:'row',gap:10}}>
        <View style={{backgroundColor:'#153A54',borderRadius:10,padding:10,width:'48%',gap:10}}>
            <Text style={{color:'white',fontWeight:700,textAlign:'center'}}>Tarif conduite :</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>
                <Text style={{color:'white'}}>1 H</Text>
                <FontAwesome5 name='arrow-right' color='white' size={20} />
                <Text style={{color:'white'}}>25 DT</Text>
            </View>
        </View>
        <View style={{backgroundColor:'#153A54',borderRadius:10,padding:10,width:'48%',gap:10}}>
            <Text style={{color:'white',fontWeight:700,textAlign:'center'}}>Tarif code :</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>
                <Text style={{color:'white'}}>1 H</Text>
                <FontAwesome5 name='arrow-right' color='white' size={20} />
                <Text style={{color:'white'}}>25 DT</Text>
            </View>
        </View>
        </View>

        <View style={{backgroundColor:'#153A54',borderRadius:10,padding:10,width:'100%',gap:10}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:700}}>total hours code : 10 H</Text>
            <View style={{backgroundColor:'#09202F',borderRadius:10,padding:10,elevation:10}}>
                <Text style={{color:'white',fontWeight:700}}>50 DT</Text> 
            </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:700}}>total lessons payed : 9 H</Text>
            <View style={{backgroundColor:'#09202F',borderRadius:10,padding:10,elevation:10}}>
                <Text style={{color:'white',fontWeight:700}}>40 DT</Text> 
            </View>
        </View>
        </View>
        
        <View style={{backgroundColor:'#153A54',borderRadius:10,padding:10,width:'100%',gap:10}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:700}}>total hours code : 10 H</Text>
            <View style={{backgroundColor:'#09202F',borderRadius:10,padding:10,elevation:10}}>
                <Text style={{color:'white',fontWeight:700}}>50 DT</Text> 
            </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:700}}>total lessons payed : 9 H</Text>
            <View style={{backgroundColor:'#09202F',borderRadius:10,padding:10,elevation:10}}>
                <Text style={{color:'white',fontWeight:700}}>40 DT</Text> 
            </View>
        </View>
        </View>

        <View style={{backgroundColor:'red',borderRadius:10,padding:10,width:'100%',gap:10}}>
            <Text style={{color:'white',fontWeight:700}}>Reminder</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <Feather name='alert-circle' color='white' size={20} />
                <Text style={{color:'white',fontWeight:700}}>Reminder</Text>
            </View>
        </View>

    </View>
  )
}

export default Payment_comp

const styles = StyleSheet.create({})