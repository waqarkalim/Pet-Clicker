import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabThreeScreen() {
	return (
		<Fragment />
		// <View style={styles.container}>
		// 	<TouchableOpacity
		// 		style={styles.button}
		// 		onPress={() => {
		// 			console.log("Pressed Remove Ads button");
		// 		}}
		// 	></TouchableOpacity>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		borderRadius: 200,
		backgroundColor: "#DDDDDD",
		padding: "44%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
