import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../pages/splash/index";
import Login from "../pages/login/index";
import Home from "../pages/Home/Home";

const Stack = createNativeStackNavigator();
export default function Routes() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Splash"
				component={Splash}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
