import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
	const list = ["cosmo", "giovanna", "grazi", "joao"];
	const fruits = [
		{
			nome: "maçã",
			cor: "vermelha",
			peso: 1000,
			image:
				"https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
		},
		{
			nome: "banana",
			cor: "amarela",
			peso: 1000,
			image:
				"https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg",
		},
		{
			nome: "uva",
			cor: "roxa",
			peso: 1000,
			image:
				"https://upload.wikimedia.org/wikipedia/commons/d/df/ConcordGrapes.jpg",
		},
	];
	function Reder({ item }) {
		console.log(item);
		return (
			<View style={{
				flexDirection: "row",
				alignSelf: "center",
				margin: 5,
				alignItems: "center",
				height: 68,
				width: "95%",
				shadowColor: "#000",
				shadowRadius: 5.84,
				elevation: 5,
				borderRadius:10,
				backgroundColor:"#fff"
				
			}}>
				<View
					style={{
						flexDirection: "row",
						borderRadius:10,
						alignSelf: "center",
						alignItems: "center",
						height: 70,
						width: "100%",
						backgroundColor:"#fff"
					}}
				>
					<View
						style={{
							borderRadius: 80,
							margin:10,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor:"#fff"
							
						}}
					>
						<Image style={styles.logo} source={{ uri: item.image }} />
					</View>
					<View style={{borderRadius: 8,}}>
						<Text>Nome: {item.nome}</Text>
						<Text>Cor: {item.cor}</Text>
						<Text>Peso (g): {item.peso}</Text>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList style={styles.lista} data={fruits} renderItem={Reder} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	lista: {
		marginTop: 140,
		width: "100%",
	},
	logo: {
		width: 50,
		height: 50,
		borderRadius: 100,
		alignSelf:"center"
	},
});
