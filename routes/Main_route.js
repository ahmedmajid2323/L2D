import { NavigationContainer } from "@react-navigation/native";
import ClientScreen from "./Client_route";
import SignUp from "../Screen/welcomePages/SignUp";
import Login from "../Screen/welcomePages/Login";
import HomePage from "../Screen/welcomePages/homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "./admin_route";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="adminScreen">
      <Stack.Screen name="homePage" component={HomePage} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="ClientScreen" component={ClientScreen} />
      <Stack.Screen name="adminScreen" component={AdminScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
    return (
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    );
  }
