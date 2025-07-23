import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../icons/inclus.png";
import { use, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

export default function Login() {
	const navigation = useNavigation();

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
			BackHandler.exitApp(),
		);
		return () => backHandler.remove();
	}, []);

	const [email, setEmail] = useState("");
	const [passWord, setPassWord] = useState("");

	function validarInformacoes() {
		if (email.trim() === "" || passWord.trim() === "") {
			alert("Por favor, preencha todos os campos!");
			return false;
		}
		//cosmo@gmail.com
		if (!/\S+@\S+\.\S+/.test(email)) {
			alert("Por favor, insira um email válido!");
			return false;
		}
		if (passWord.length < 6) {
			alert("A senha deve ter pelo menos 6 caracteres.");
			return false;
		}
		return true;
	}

	async function setToken(value) {
		try {
			await SecureStore.setItemAsync("token", value)
			return true;
		}
		catch (error) {
			throw new Error("Erro ao salvar o token: " + error.message);
		}

	}

	async function autenticate() {
		try {
			if (!validarInformacoes()) {
				return;
			}
			let res = await axios.post("http://192.168.100.240:3000/login", {
				email: email.toLocaleLowerCase(),
				password: passWord,
			});

			console.log("Resposta do servidor:", res.data);
			if (res.data.token) {
				let saveToken = await setToken(res.data.token);
				if(saveToken){
					navigation.navigate("Home");
				}
				return;
			}
			else {
				alert("Dados inválidos. Por favor, tente novamente.");
			}
			return;
		} catch (error) {
			console.error("Erro:", error);
		}
	}


	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.container}>
					<Text style={styles.title}>Login</Text>
					<Image style={styles.logo} source={Logo} />
					<View style={styles.formContainer}>
						<TextInput
							style={styles.input}
							placeholder="Email"
							placeholderTextColor="#888"
							keyboardType="email-address"
							value={email}
							onChangeText={setEmail}
						/>
						<TextInput
							style={styles.input}
							placeholder="Senha"
							placeholderTextColor="#888"
							secureTextEntry={true}
							value={passWord}
							onChangeText={setPassWord}
						/>
					</View>
					<TouchableOpacity
						onPress={() => autenticate()}
						style={styles.buttom}
					>
						<Text style={styles.textButton}>Entrar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	container: {
		width: "100%",
		alignItems: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "500",
		marginBottom: 30,
		color: "#333",
		textAlign: "center",
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 40,
		borderRadius: 100,
	},
	formContainer: {
		width: "100%",
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
		width: "100%",
		borderRadius: 10,
		height: 40,
		backgroundColor: "blue",
		justifyContent: "center",
		marginTop: 10,
	},
	textButton: {
		color: "#fff",
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
});
