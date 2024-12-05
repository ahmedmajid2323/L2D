import { StyleSheet, Text, View , Image, TextInput, ScrollView, Pressable, Linking, Alert} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Home = ({navigation}) => {

  const [categories, setcategories] = useState(
    [
      {name:'all courses' , clicked: true},
      {name:'my Mentors' , clicked: false},
      {name:'daily goals' , clicked: false},
    ]
  )

  const handleCategorie = (i)=>{
    setcategories(categories.map((item , index)=>{
      if (index == i) {
        return {...item , clicked : true}
      }else{
        return {...item , clicked : false}
      }
    })
  )
  }

  const mentors = [
    {name:'mentor name 1' , photo_path:require('../../../assets/mentor_woman.png') , phone_num : '+216 12 345 678'},
    {name:'mentor name 2' , photo_path:require('../../../assets/mentor_man.png') , phone_num : '+216 87 654 321'},
  ]

  const handleCall = (phoneNumber) =>{
    const url = `tel:${phoneNumber}`
    Linking.canOpenURL(url)
    .then((supported)=>{
      if (!supported) {
        Alert.alert('Error','phone calls are not supported on this devices')
      } else {
        Linking.openURL(url)
      }
    })
    .catch((error)=>console.log('error making phone call',error))
  }
  

  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.linearGradient}>

      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10, paddingHorizontal:20}}>
        <View style={{flexDirection:'col',gap:2}}>
          <Text style={{color:'white',opacity:0.5,fontSize:17}}>Welcome</Text>
          <Text style={{color:'white',fontWeight:700,fontSize:25}}>James Gordon</Text>
          <Text style={{color:'green'}}>1520 XP</Text>
        </View>
        <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
          <Ionicons name='notifications' size={50}  />
          <Image source={require('../../../assets/user.png')} />
        </View>
      </View>

      <View style={{minHeight:32}} >
          <View style={{flexDirection:'row',justifyContent:'space-evenly',gap:10}}>
            {
              categories.map((item , i)=>(
                <Pressable onPress={()=>handleCategorie(i)}
                style={{backgroundColor: item.clicked ?'red' : 'white',padding:5,paddingHorizontal:8,borderRadius:20}} key={i}>
                  <Text style={{color:item.clicked ? 'white' :'#153A54',fontWeight:700}}>{item.name}</Text>
                </Pressable>
              ))
            }
          </View>
      </View>

      {
        categories.map((categorie) => {
          if (categorie.clicked) {
            if (categorie.name === 'all courses') {
              return (
              <>
              {/******************************************************** Courses Section ******************************************************/}
        
                <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:20}}>
                  <TextInput style={{backgroundColor:'white',borderRadius:50,padding:10,zIndex:0,width:'100%',paddingHorizontal:20}} placeholder='search courses here...'/>
                  <Image style={{position:'relative',left:-35,zIndex:1}} source={require('../../../assets/icon_search.png')} />
                </View>

                <ScrollView>
                  <View style={styles.container}>
                    {
                      Array.from({length:8} , (_ , index)=>(
                        <View key={index} style={styles.square}>
                          <Text style={styles.text}>box n°{index + 1}</Text>
                        </View>
                      ))
                    }
                  </View>
                </ScrollView>
              </>)
            } else if (categorie.name === 'my Mentors') {
              return (
              <>
              {/******************************************************** Mentors Section ******************************************************/}
              <View key={categorie.name} style={{paddingHorizontal:20,flexDirection:'column',gap:20}}>
                {
                  mentors.map((mentor , index)=>{
                    return (
                      <View key={index} style={styles.box_mentor}>
                      <Image source={mentor.photo_path} />
                        <View style={{flexDirection:'col',gap:20}}>
                          <Text style={styles.mentor_name}>{mentor.name}</Text>
                          <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'flex-end',marginRight:10}}>
                            <Pressable onPress={()=>handleCall(mentor.phone_num)}
                             style={{flexDirection:'row',alignItems:'center',gap:10}}>
                              <Image style={{width:20,height:20}} source={require('../../../assets/icons/phone.png')}/> 
                              <Text style={{color:'white'}}>call</Text>
                            </Pressable>
                            {/*** use redux to pass the mentor willing to talk to ****/}
                            <Pressable onPress={()=>navigation.navigate('chat')}
                             style={{flexDirection:'row',alignItems:'center',gap:10}}>
                              <Image source={require('../../../assets/icons/message.png')}/>
                              <Text style={{color:'white'}}>message</Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
              </> )
            } else if (categorie.name === 'daily goals') {
              return (
              <>
              {/******************************************************** Daily goals Section ******************************************************/}
              <Text key={categorie.name} style={{ color: 'white' }}>hello in daily goals section</Text>
              </> )
            }
          }
          return null; // Return null if no conditions match
        })
      }

    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  linearGradient:{
      flex:1,
      paddingTop:20,
      gap:30
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap to the next row when line is full
    justifyContent: 'space-between', 
    paddingHorizontal:10,
  },
  square: {
    width: '48.5%', 
    height: '48%', 
    aspectRatio: 1, // Ensure squares remain squares
    backgroundColor: '#4CAF50', 
    marginBottom: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 5, 
  },
  box_mentor:{
    padding:25,
    borderWidth:1 ,
    borderColor:'red',
    borderRadius:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  mentor_name:{
    fontSize:20,
    color:'white',
    marginRight:20
  }
})