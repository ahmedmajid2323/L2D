import { StyleSheet, Text, View,Image, TextInput, Pressable, TouchableOpacity, Alert, Modal,TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LoaderKit from 'react-native-loader-kit'

const SignUp = ({navigation}) => {

    const [Modal_registred, setModal_registred] = useState(false)
    const [Loading, setLoading] = useState(false)

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
            try {
                setLoading(true)
                auth()
                    .createUserWithEmailAndPassword( userCredentiels.email.trim() , userCredentiels.password.trim() )
                    .then(()=>{
                        firestore()
                            .collection('users')
                            .add({
                                name: userCredentiels.full_name.trim(),
                                email: userCredentiels.email.trim().toLowerCase(),
                                address: userCredentiels.address.trim(),
                                phone: userCredentiels.phone.trim(),
                                type: 'client',
                                agenda: [],
                                account_status: 'pending', // 'approved' , 'rejected'
                            })
                            .then(() => {
                                setLoading(false)
                                setModal_registred(true)
                                setuserCredentiels({
                                    email:'',
                                    full_name:'',
                                    address:'',
                                    phone:'',
                                    password: '',
                                })
                                setNext_step(!Next_step)
                                setPasswordConfirmation('')
                            });
                    })
            } catch (error) {
                console.log('error creating new account',error)
            }
            
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
                        <TextInput value={userCredentiels?.address}
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
                    <Pressable onPress={()=>setNext_step(!Next_step)} >
                        <Icon name='arrow-left' color='red' size={20}/>
                    </Pressable>
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

        <Modal transparent visible={Modal_registred} animationType='fade' >
            <TouchableWithoutFeedback onPress={()=>setModal_registred(false)} >
            <View style={styles.modal} >
                <View style={styles.modal_square}>

                    <View style={{gap:10}}>
                        <View style={{flexDirection:'row',gap:10,alignItems:'center',justifyContent:'center'}}>
                            <Icon name='check-circle' color='green' size={25} />
                            <Text style={{color:'#000B14',fontSize:15}} >account registred successfully !</Text>
                        </View>
                        <Text style={{color:'#000B14',fontSize:15,textAlign:'center'}}>Please wait for the approval of the admin</Text>
                    </View>
                    <TouchableOpacity style={{borderRadius:20,backgroundColor:'red',padding:10,width:100}}
                    onPress={()=>setModal_registred(false)} >
                        <Text style={{color:'white',fontWeight:700,textAlign:'center'}}>Ok</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>

        <Modal transparent visible={Loading} animationType='fade' >
            <View style={{backgroundColor:'rgba(0,0,0,0.6)',flex:1,justifyContent:'center',alignItems:'center'}} >
                <LoaderKit
                style={{ width: 50, height: 50 }}
                name={'BallBeat'} 
                color={'red'} 
                />
            </View>
        </Modal>
        
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
    },
    modal:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    modal_square:{
        backgroundColor:'white',
        elevation:10,
        borderRadius:20,
        padding:20,
        alignItems:'center',
        justifyContent:'center',
        gap:20
    }
})