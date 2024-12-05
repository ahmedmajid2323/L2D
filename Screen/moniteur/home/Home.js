import { Image, Pressable, ScrollView, StyleSheet, Text, View , TextInput } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Home = ({navigation}) => {

    const client_data = [
        {name:'client name 1' , phone_num : '+216 12 345 678'},
        {name:'client name 2' , phone_num : '+216 87 654 321'},
        {name:'client name 1' , phone_num : '+216 12 345 678'},
        {name:'client name 2' , phone_num : '+216 87 654 321'},
        {name:'client name 1' , phone_num : '+216 12 345 678'},
        {name:'client name 2' , phone_num : '+216 87 654 321'},
    ]

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

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
            <Image style={{position:'relative',left:-35,zIndex:1}} source={require('../../../assets/icon_search.png')} />
        </View>

        <ScrollView style={{flexDirection:'column',gap:20,marginTop:20}}>
            {
                client_data.map((client , index)=>(
                    <View key ={index} style={styles.box_client}>
                        <Pressable onPress={()=>navigation.navigate('profile')} >
                            <Image source={require('../../../assets/mentor_man.png')} />
                        </Pressable>
                        <View style={{flexDirection:'col',gap:20}}>
                            <Text style={{fontSize:20,color:'white',marginRight:20}}>{client.name}</Text>
                            <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'flex-end',marginRight:10}}>
                            <Pressable /* onPress={()=>handleCall(mentor.phone_num)} */
                                style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <Image style={{width:20,height:20}} source={require('../../../assets/icons/phone.png')}/> 
                                <Text style={{color:'white'}}>call</Text>
                            </Pressable>
                            {/*** use redux to pass the client willing to talk to ****/}
                            <Pressable onPress={()=>navigation.navigate('chat')}
                                style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <Image source={require('../../../assets/icons/message.png')}/>
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