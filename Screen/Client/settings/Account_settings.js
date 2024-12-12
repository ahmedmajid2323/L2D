import { StyleSheet, Text, View , Pressable, TextInput, TouchableOpacity , ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'

const Account_settings = ({setAccount_fct}) => {

    const user_credentiels = useSelector(state => state.client.client_credentiels)
    const [editable_state, seteditable_state] = useState(false)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
    <View style={{borderRadius:20,borderWidth:1,borderColor:'red',paddingVertical:30,paddingHorizontal:30,marginHorizontal:10}} >
        <Pressable style={{marginBottom:10}} onPress={()=>{
        setAccount_fct()
        seteditable_state(false)}} >
            <FontAwesome5 name='arrow-left' color='red' size={20} />
        </Pressable>
        <Text style={{color:'red',fontWeight:700,fontSize:25,textAlign:'center',marginBottom:20}}>User profile</Text>
        <View style={{alignItems:'center',flexDirection:'column',gap:10}}>

        <View style={{width:'100%'}}>
            <TextInput editable={editable_state} value={user_credentiels.name}
            style={styles.input} />
        </View>
        <View style={{width:'100%'}}>
            <TextInput editable={editable_state} value={user_credentiels.email}
            style={styles.input} />
        </View>
        <View style={{width:'100%'}}>
            <TextInput editable={editable_state} value={user_credentiels.address}
            style={styles.input} />
        </View>
        <View style={{width:'100%'}}>
            <TextInput editable={editable_state} value={user_credentiels.phone}
            style={styles.input} />
        </View>

        <TouchableOpacity onPress={()=>seteditable_state(true)}
        style={styles.button}>
            <Text style={{color:'white',fontWeight:700,fontSize:15,textAlign:'center'}}>Update</Text>
        </TouchableOpacity>

        </View>
    </View>
     </ScrollView>
     </KeyboardAvoidingView>
  )
}

export default Account_settings

const styles = StyleSheet.create({
    input:{
        padding:5,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:5,
        paddingHorizontal:15
    },
      button:{
        padding:10,
        backgroundColor:'red',
        borderRadius:20,
        marginTop:5,
        paddingHorizontal:15,
        width:'100%'
    },
})

