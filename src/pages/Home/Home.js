import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
	const list = ["cosmo", "giovanna", "grazi", "joao"];
	const fruits = [
		{
			nome: "maçã",
			cor: "vermelha",
			image:
				"https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
		},
		{
			nome: "banana",
			cor: "amarela",
			image:
				"https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg",
		},
		{
			nome: "uva",
			cor: "roxa",
			image:
				"https://upload.wikimedia.org/wikipedia/commons/d/df/ConcordGrapes.jpg",
		},
	];
	function Reder({ item }) {
		console.log(item);
		return (
			<View style={{flexDirection:"row", alignItems:"center", backgroundColor:"cyan", margin:5}} >
				<Image
					style={styles.logo}
					source={{	uri: item.image,}}
				/>
				<Text>
					Nome da fruta: {item.nome} cor da fruta:{item.cor}
				</Text>
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
		alignItems: "center",
	},
	lista: {
		alignSelf: "center",
		marginTop: 140,
	},
	logo: {
		width: 50,
		height: 50,
		marginBottom: 40,
		borderRadius: 100,
		backgroundColor: "red",
	},
});
