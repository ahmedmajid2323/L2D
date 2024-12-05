import { StyleSheet, Text, View , Image , Pressable, TouchableOpacity} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const ProfileClient = ({navigation}) => {
  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>
      
        <View style={styles.profileContainer}>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                <Image style={{width:50 , height:50}} source={require('../../../assets/user.png')}  />
                <View style={{flexDirection:'column',alignItems:'center',gap:10}}>
                    <Text style={{fontWeight:600, color:'#ffffff',fontSize:25}}>Full name</Text>
                    <View style={{flexDirection:'row',gap:20}}>
                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                            <Image style={{width:20 , height:20}} source={require('../../../assets/icons/phone.png')}  />
                            <Text style={{color:'white'}}>+216 23 456 789</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                            <Image style={{width:20 , height:20}} source={require('../../../assets/icons/message.png')}  />
                            <Text style={{color:'white'}}>text</Text>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('new_lesson')}
            style={{backgroundColor:'#C00F0C',padding:10,borderRadius:20,marginTop:20}}>
                <Text style={{fontWeight:700,color:'#ffffff',textAlign:'center'}}>Start new lesson</Text>
            </TouchableOpacity>
        </View>

    </LinearGradient>
  )
}

export default ProfileClient

const styles = StyleSheet.create({
    screen:{
        padding: 10 ,
        flex:1
    },
    profileContainer:{
        borderRadius:20,
        borderColor:'red',
        borderWidth:1,
        flex:1,
        padding:20
    },
})