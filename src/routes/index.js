import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../pages/login/index"
import Splash from "../pages/splash/index"

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="Splash"
        component={Splash}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="Login"
        component={Login}
        options={{headerShown:false}}
        />
    </Stack.Navigator>

 );   
}