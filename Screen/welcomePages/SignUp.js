import { StyleSheet, Text, View,Image, TextInput, Pressable, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const SignUp = ({navigation}) => {

    const [Next_step, setNext_step] = useState(false)
    const [userCredentiels, setuserCredentiels] = useState({
        email:'',
        full_name:'',
        address:'',
        phone:'',
        password: '',
    })
    const [PasswordConfirmation, setPasswordConfirmation] = useState()

    const handleSubmission = ()=>{
        if (PasswordConfirmation !== userCredentiels.password) {
            Alert.alert('Warning' , 'please confirm the same password !')
        } else if (!userCredentiels.full_name.trim() || !userCredentiels.address.trim() || !userCredentiels.phone.trim()
            || !userCredentiels.password.trim() || !userCredentiels.email.trim() ) {
                Alert.alert('alert' , 'All fields are required !')
        }else{
            console.log('submitted')
        } 
    }

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.linearGradient}>
        <View style={{paddingVertical:20}}>
            <Image source={require('../../assets/logo.png')}/>
        </View>
        <View style={{paddingHorizontal:20}}>
            <Text style={{color:'white',fontSize:32,fontWeight:700,marginBottom:10}}>Create an account</Text>
            <Text style={{color:'#FFFBFB',opacity:0.5}}>Create your account, it takes less than a minute</Text>
        </View>
        <View style={styles.form}>
            {
                !Next_step ? (
                    <>
                    <View>
                        <Text style={styles.text}>Full name : </Text>
                        <TextInput value={userCredentiels?.full_name}
                        onChangeText={(text)=>setuserCredentiels(prev=>({...prev, full_name: text}))}
                        style={styles.input} />
                    </View>
                    <View>
                        <Text style={styles.text}>Address : </Text>
                        <TextInput value={userCredentiels?.adress}
                        onChangeText={(text)=>setuserCredentiels(prev=>({...prev, address: text}))}
                        style={styles.input} />
                    </View>
                    <View>
                        <Text style={styles.text}>phone number : </Text>
                        <TextInput value={userCredentiels?.phone}
                        onChangeText={(text)=>setuserCredentiels(prev=>({...prev, phone: text}))}
                        style={styles.input} />
                    </View>
                    <View style={{flexDirection:'row' , gap:10,justifyContent:'center',alignItems:'center'}} >
                        <View style={{width:10 , height:10 , borderRadius:50 , backgroundColor:'red',elevation:10}} />
                        <View style={{width:10 , height:10 , borderRadius:50 , backgroundColor:'white',elevation:10}} />
                    </View>
                    <TouchableOpacity onPress={()=>setNext_step(true)}
                    style={styles.button}>
                        <Text style={{color:'white',textAlign:'center'}}>Next</Text>
                    </TouchableOpacity>
                    </>
                )
                :(
                    <>
                    <View>
                        <Text style={styles.text}>Email : </Text>
                        <TextInput value={userCredentiels?.email}
                        onChangeText={(text)=>setuserCredentiels(prev=>({...prev, email: text}))}
                        style={styles.input} />
                    </View>
                    <View>
                        <Text style={styles.text}>Password : </Text>
                        <TextInput value={userCredentiels?.password} secureTextEntry 
                        onChangeText={(text)=>setuserCredentiels(prev=>({...prev, password: text}))}
                        style={styles.input} />
                    </View>
                    <View>
                        <Text style={styles.text}>Confirm Password : </Text>
                        <TextInput value={PasswordConfirmation} secureTextEntry
                        onChangeText={(text)=>setPasswordConfirmation(text)}
                        style={styles.input} />
                    </View>
                    <View style={{flexDirection:'row' , gap:10 ,justifyContent:'center',alignItems:'center'}} >
                        <View style={{width:10 , height:10 , borderRadius:50 , backgroundColor:'white',elevation:10}} />
                        <View style={{width:10 , height:10 , borderRadius:50 , backgroundColor:'red',elevation:10}} />
                    </View>
                    <TouchableOpacity onPress={handleSubmission}
                    style={styles.button}>
                        <Text style={{color:'white',textAlign:'center'}}>Submit</Text>
                    </TouchableOpacity>
                </>
                )
            }
            
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',color:'white',marginVertical:20,fontSize:20}}>Already have an account ? </Text>
            <Pressable onPress={()=>navigation.navigate('login')}><Text style={{color:'red',textDecorationLine:'underline',fontSize:17}}>SignIn</Text></Pressable>
        </View>
        
    </LinearGradient>
  )
}

export default SignUp

const styles = StyleSheet.create({
    linearGradient:{
        height:'100%',
    },
    text:{
    color:'white',
    },
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
        borderRadius:10
    },
    form:{
        padding:20,
        borderWidth:1,
        borderColor:'red',
        marginHorizontal:20,
        borderRadius:20,
        flexDirection:'column',
        gap:20,
        marginTop:20
    },
    line:{
        width:'40%',
        height:1,
        backgroundColor:'white'
    }
})