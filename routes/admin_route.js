import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Account from '../Screen/moniteur/Account'
import Home from '../Screen/moniteur/home/Home'
import Agenda from '../Screen/moniteur/Agenda'
import LinearGradient from 'react-native-linear-gradient'
import { Image, Text, View } from 'react-native'
import ProfileClient from '../Screen/moniteur/home/ProfileClient'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewLesson from '../Screen/moniteur/home/NewLesson'

const Tab = createBottomTabNavigator()

export default function AdminScreen() {
  return (
    <LinearGradient
    colors={['#153A54','#153A54']}
    style={{flex:1}}>
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle:{
        height:65,
        elevation:0,
        backgroundColor: 'transparent' ,
        margin:10,
        paddingTop:5,
        borderTopWidth:0
      }
    }}>
      <Tab.Screen options={{
        headerShown:false,
        tabBarIcon: ({color , focused})=>(
          <View style={{marginTop:20,alignItems:'center'}}>
            <View style={{backgroundColor:focused ? 'red' : null ,paddingHorizontal:20,paddingVertical:6,borderRadius:40}}>
              <Image source={require('../assets/bottomTabs/home.png')}  />
            </View>
            <Text style={{color:'white',textAlign:'center',fontWeight:300,fontSize:10,marginTop:3}}>home</Text>
          </View>
        )
      }}
      name="home_admin" component={Home_screen} />
      <Tab.Screen options={{
        headerShown:false,
        tabBarIcon: ({focused , color})=>(
          <View style={{marginTop:20,width:50,alignItems:'center'}}>
            <View style={{backgroundColor:focused ? 'red' : null ,paddingHorizontal:20,paddingVertical:6,borderRadius:40}}>
              <Image source={require('../assets/bottomTabs/calendar.png')}  />
            </View>
            <Text style={{color:'white',textAlign:'center',fontWeight:300,fontSize:10,marginTop:3}}>Calendar</Text>
          </View>
        )
          
      }}
      name="agenda_admin" component={Agenda} />
      <Tab.Screen options={{
        headerShown:false,
        tabBarIcon:({focused , color})=>(
          <View style={{marginTop:20,width:40,alignItems:'center'}}>
            <View style={{backgroundColor:focused ? 'red' : null ,paddingHorizontal:20,paddingVertical:6,borderRadius:40}}>
              <Image source={require('../assets/bottomTabs/account.png')}  />
            </View>
            <Text style={{color:'white',textAlign:'center',fontWeight:300,fontSize:10,marginTop:3}}>Account</Text>
          </View>
        )

      }}
      name="account_admin" component={Account} />
    </Tab.Navigator>
    </LinearGradient>
  )
}

const Stack = createNativeStackNavigator();

function Home_screen(){
  return(
  <Stack.Navigator screenOptions={{headerShown: false}} >
    <Stack.Screen name='home' component={Home} />
    <Stack.Screen name='profile' component={ProfileClient} />
    <Stack.Screen name='new_lesson' component={NewLesson} />
  </Stack.Navigator>
  )
}