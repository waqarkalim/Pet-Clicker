import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

import AppButton from "../components/AppButton";
import Colors from "../constants/Colors";
import useStatusBar from "../hooks/useStatusBar";

import useColorScheme from "../hooks/useColorScheme";

// import Svg, { Use, Image, SvgUri } from "react-native-svg";
// import * as Svg from "react-native-svg";

import { Dimensions } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

const logo = require("../assets/logo/logo.png");
console.log(logo);

export default function WelcomeScreen({ navigation }) {
	const colorScheme = useColorScheme();
	useStatusBar("light-content");

	const win = Dimensions.get("window");
	const width = win.width * 1.2;
	console.log(width);
	const height = win.height * 1.2;

	const sizeToUseForLogo = width < height ? width : height;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			// justifyContent: "flex-end",
			justifyContent: "space-evenly",
			alignItems: "center",
			backgroundColor: Colors[colorScheme].background,
			// flexDirection: "column",
			flexGrow: 4,
		},
		logoContainer: {
			// position: "absolute",
			// top: 150,
			alignItems: "center",
			justifyContent: "center",
		},
		logo: {
			// width: 500,
			// height: 500,
			width: sizeToUseForLogo,
			height: sizeToUseForLogo,
		},
		subtitle: {
			fontSize: 24,
			fontWeight: "600",
			paddingVertical: 20,
			color: Colors[colorScheme].primary,
		},
		buttonContainer: {
			padding: 20,
			// paddingBottom: 30,
			width: "100%",
		},
	});

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={logo} style={styles.logo} />
				{/* <Text style={styles.subtitle}>Pet Clicker</Text> */}
			</View>
			<View style={styles.buttonContainer}>
				<AppButton
					title="Login"
					onPress={() => navigation.navigate("Login")}
				/>
				<AppButton
					title="Register"
					color="secondary"
					onPress={() => navigation.navigate("Register")}
				/>
			</View>
		</View>
	);
}
