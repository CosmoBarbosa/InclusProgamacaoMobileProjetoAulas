import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Image,
	TouchableOpacity,
	Keyboard,
	BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../icons/inclus.png";
import { useState, useEffect } from "react";

export default function Login() {
	const navigation = useNavigation();
	const [margin, setMargin] = useState("50%");

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
			BackHandler.exitApp(),
		);
		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setMargin("10%");
		});
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setMargin("50%");
		});
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 32,
					fontWeight: "500",
					marginBottom: 30,
					color: "#333",
					textAlign: "center",
					marginTop: margin,
				}}
			>
				Login
			</Text>
			<Image style={styles.logo} source={Logo} />
			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor="#888"
					keyboardType="email-address"
				/>
				<TextInput
					style={styles.input}
					placeholder="Senha"
					placeholderTextColor="#888"
					secureTextEntry={true}
				/>
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate("Home")}
				style={styles.buttom}
			>
				<Text style={styles.textButton}>Entrar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
		alignItems: "center",
	},

	logo: {
		width: 100,
		height: 100,
		marginBottom: 40,
		borderRadius: 100,
	},
	formContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
	input: {
		height: 48,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	buttom: {
		width: "90%",
		borderRadius: 10,
		height: 40,
		backgroundColor: "blue",
		justifyContent: "center",
	},
	textButton: {
		color: "#fff",
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
});
