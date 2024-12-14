import { NavigationContainer } from "@react-navigation/native";
import ClientScreen from "./Client_route";
import SignUp from "../Screen/welcomePages/SignUp";
import Login from "../Screen/welcomePages/Login";
import HomePage from "../Screen/welcomePages/homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "./admin_route";
import store from "../redux/store";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setAccount_status, setUser_credentiels } from "../redux/slices/Client_slice";
import { setUser_type } from "../redux/slices/typeSlice";
import { setAdmin_agenda, setAdmin_credentiels } from "../redux/slices/Admin_slice";

const Stack = createNativeStackNavigator();

function Routes() {

  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const user_type = useSelector(state=>state.userType)

  function onAuthStateChanged(user) {
    setUser(user)
    
    if (user) {
      firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                const data = documentSnapshot.data()
                if (data.email === user.email) {
                  if (data.type == 'admin') {
                    dispatch(setUser_type('admin'))
                    firestore()
                      .collection('users')
                      .where('email','==',data.email)
                      .get()
                      .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                          const admin_data = {
                            ...doc.data(),
                            uid : doc.id
                          }
                          dispatch(setAdmin_credentiels(admin_data))
                        });
                      });
                  } 
                  if(data.type == 'client'){
                    if (data.account_status !== 'approved') {
                      dispatch(setAccount_status(data.account_status))
                      console.log('account status from mainroute:',data.account_status)
                    }else{
                      dispatch(setUser_type('client'))
                      const user_credentiels = firestore()
                        .collection('users')
                        .where('email','==',data.email)
                        .get()
                        .then(querySnapshot => {
                          querySnapshot.forEach(doc => {
                            dispatch(setUser_credentiels(doc.data()))
                          });
                      });
                    }
                  }
                }
            });
        })
        .catch(error => {
            console.log('error fetching data',error)
        });
    }
    

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      {
        user ? 
        (
          user_type == 'admin' ? 
          (
            <Stack.Screen name="adminScreen" component={AdminScreen} />
          )
          : user_type == 'client' ?
          (
            <Stack.Screen name="ClientScreen" component={ClientScreen} />
          ) 
          : 
          (
            <>
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="login" component={Login} />
            </>
          )
        )
        :
        (
          <>
          <Stack.Screen name="homePage" component={HomePage} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={SignUp} />
          </>
        )
    }
    </Stack.Navigator>
  )
}

export default function App() {
    return (
      <Provider store={store} >
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </Provider>
    );
  }
