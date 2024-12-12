import { Image, Pressable, ScrollView, StyleSheet, Text, View , TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import Icon_logout from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { setUser_type } from '../../../redux/slices/typeSlice'
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {

    const dispatch = useDispatch()
    const admin_credentiels = useSelector(state=>state.admin.admin_credentiels)

    const [Clients, setClients] = useState([])
    useEffect(() => {
        let isMounted = true;
        const fetchClients = async () => {
          try {
            const querySnapshot = await firestore()
              .collection('users')
              .where('type', '==', 'client')
              .get();
            if (isMounted) {
              const clientsData = querySnapshot.docs.map(doc => doc.data());
              setClients(clientsData);
            }
          } catch (error) {
            console.error('Error fetching clients:', error);
          }
        };
        fetchClients();
    
        return () => {
          isMounted = false;
        };
    }, []);

    const handleLogout = ()=>{
        dispatch(setUser_type(''))
        auth().signOut()
    }

  return (
    <LinearGradient
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10,padding:5,borderColor:'red',borderWidth:1,borderRadius:10,paddingVertical:10,width:103}}
        onPress={handleLogout} >
            <Icon_logout name='logout' size={20} color='white'  />
            <Text style={{color:'white',fontWeight:700}}>Sign Out</Text>
        </TouchableOpacity  >

        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10, paddingHorizontal:20}}>
            <View style={{flexDirection:'col',gap:2}}>
                <Text style={{color:'white',opacity:0.5,fontSize:17}}>Welcome</Text>
                <Text style={{color:'white',fontWeight:700,fontSize:25}}>Moiteur Boujmil</Text>
            </View>
            <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                <Image style={{width:45 , height: 45}} source={require('../../../assets/user.png')} />
            </View>
        </View>

        <View style={{flexDirection:'row', alignItems:'center',marginTop:20}}>
            <TextInput style={{backgroundColor:'white',borderRadius:50,padding:10,zIndex:0,width:'100%',paddingHorizontal:20}} placeholder='search clients here...'/>
            <Icon name='search' color='black' size={20} style={{position:'relative',left:-40,zIndex:1}} />
        </View>

        <ScrollView style={{flexDirection:'column',gap:20,marginTop:20}}>
            {
                Clients.map((client , index)=>(
                    <View key ={index} style={styles.box_client}>
                        <Pressable onPress={()=>navigation.navigate('profile')} >
                            <Image source={require('../../../assets/mentor_man.png')} />
                        </Pressable>
                        <View style={{flexDirection:'col',gap:20}}>
                            <Text style={{fontSize:20,color:'white',marginRight:20}}>{client.name}</Text>
                            <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'flex-end',marginRight:10}}>
                            <Pressable /* onPress={()=>handleCall(mentor.phone_num)} */
                                style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <Icon name='phone' color='white' size={20} />
                                <Text style={{color:'white'}}>call</Text>
                            </Pressable>
                            {/*** use redux to pass the client willing to talk to ****/}
                            <Pressable onPress={()=>navigation.navigate('chat')}
                                style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <Icon name='message-square' color='white' size={20} />
                                <Text style={{color:'white'}}>message</Text>
                            </Pressable>
                            </View>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
      
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding:10
    },
    box_client:{
        padding:10,
        borderWidth:1 ,
        borderColor:'red',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:15
      },
})