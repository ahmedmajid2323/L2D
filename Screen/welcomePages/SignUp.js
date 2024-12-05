import { StyleSheet, Text, View,Image, TextInput, Pressable, } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const SignUp = ({navigation}) => {
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
            <View>
                <Text style={styles.text}>Full name </Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <Text style={styles.text}>Email </Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <Text style={styles.text}>Password </Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <Text style={styles.text}>Confirm Password </Text>
                <TextInput style={styles.input} />
            </View>
            <Pressable style={styles.button}>
                <Text style={{color:'white',textAlign:'center'}}>SignUp</Text>
            </Pressable>
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