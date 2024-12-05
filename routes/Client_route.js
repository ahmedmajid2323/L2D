import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screen/welcomePages/Login";
import SignUp from "../Screen/welcomePages/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screen/Client/home/Home";
import Circuits from "../Screen/Client/lessons/Circuits";
import Settings from "../Screen/Client/Settings";
import { Image, Text, View } from "react-native";
import HomePage from "../Screen/welcomePages/homepage";
import LinearGradient from "react-native-linear-gradient";
import Calendar from "../Screen/Client/Calendar";
import Chat_client from "../Screen/Client/home/Chat";
import Map_details from "../Screen/Client/lessons/Map_details";


/******************************************************** tab bar navigation ***************************************************/

const Tab = createBottomTabNavigator()

export default function ClientScreen() {
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
      name="home" component={Home_tab} />
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
      name="calendar" component={Calendar} />
      <Tab.Screen options={{
        headerShown:false,
        tabBarIcon:({focused , color})=>(
          <View style={{marginTop:20,width:40,alignItems:'center'}}>
            <View style={{backgroundColor:focused ? 'red' : null ,paddingHorizontal:20,paddingVertical:6,borderRadius:40}}>
              <Image source={require('../assets/bottomTabs/circuits.png')}  />
            </View>
            <Text style={{color:'white',textAlign:'center',fontWeight:300,fontSize:10,marginTop:3}}>Lessons</Text>
          </View>
        )

      }}
      name="circuits" component={Lessons} />
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
      name="settings" component={Settings} />
    </Tab.Navigator>
    </LinearGradient>
  )
}

/************************************************* stack navigation for each tab bar **************************************/

const Stack = createNativeStackNavigator();

function Home_tab() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home_tab" component={Home} />
      <Stack.Screen name="chat" component={Chat_client} />
    </Stack.Navigator>
  )
}

function Lessons() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Lessons_tab" component={Circuits} />
      <Stack.Screen name="map_details" component={Map_details} />
    </Stack.Navigator>
  )
}

