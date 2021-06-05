import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import Colors from "../utils/colors";

import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function TabOneScreen() {
	const [sound, setSound] = React.useState();

	const playSound = async () => {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			require("./../assets/sounds/household_bathroom_extractor_fan_switch_click.mp3")
		);
		await Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
		});
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	};

	React.useEffect(() => {
		return sound
			? () => {
					console.log("Unloading Sound");
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	return (
		<React.Fragment>
			<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={playSound}>
					<Icon name="pets" size={200} color="#FFF" />
				</TouchableOpacity>
			</View>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primary,
	},
	button: {
		// display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 200,
		// backgroundColor: "#DDDDDD",
		backgroundColor: Colors.secondary,
		padding: "20%",
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
