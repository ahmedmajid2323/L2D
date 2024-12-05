import { StyleSheet, Text, View,Image, TextInput, Pressable, } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Login = ({navigation}) => {
  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.linearGradient}>
        <View style={{paddingVertical:20}}>
            <Image source={require('../../assets/logo.png')}/>
        </View>
        <View style={{paddingHorizontal:20}}>
            <Text style={{color:'white',fontSize:32,fontWeight:700,marginBottom:10}}>Welcome Back,</Text>
            <Text style={{color:'#FFFBFB',opacity:0.5}}>We’re happy to see you here again. Enter your email and password to sign in</Text>
        </View>
        <View style={styles.form}>
            <View>
                <Text style={styles.text}>Email :</Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <Text style={styles.text}>Password :</Text>
                <TextInput style={styles.input} />
            </View>
            <Pressable onPress={()=>navigation.navigate('ClientScreen')}
            style={styles.button}>
                <Text style={{color:'white',textAlign:'center'}}>Sign In</Text>
            </Pressable>
        </View>
        <Text style={{textAlign:'center',color:'white',marginVertical:20,fontSize:24}}>forgot password ?</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={styles.line}></View>
            <Text style={{color:'white', fontWeight:700}}>  or  </Text>
            <View style={styles.line}></View>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Pressable onPress={()=>navigation.navigate('signup')}
            style={{backgroundColor:'#153A54',padding:10,elevation:10,width:'60%',borderRadius:10,marginTop:50}}>
                <Text style={{color:'white',textAlign:'center'}}>Create Account</Text>
            </Pressable>
        </View>
        
    </LinearGradient>
  )
}

export default Login

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