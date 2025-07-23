import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from "../pages/splash/index"
import Scan from "../pages/Scan/scan"
import Login from "../pages/login/index"
import Home from "../pages/Home/Home"
const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Scan"
                component={Scan}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="Login"
                component={Login}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="Home"
                component={Home}
                options={{ headerShown: false, gestureEnabled: false }}
            />
        </Stack.Navigator>
    );
}