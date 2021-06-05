// import * as React from "react";
// import { StyleSheet, TouchableOpacity } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";

// import Icon from "react-native-vector-icons/MaterialIcons";

// export default function TabTwoScreen() {
// 	return (
// 		<React.Fragment>
// 			<View style={styles.container}>
// 				<TouchableOpacity
// 					style={styles.button}
// 					onPress={() => {
// 						console.log("Remove Ads button pressed");
// 					}}
// 				>
// 					<Icon name="celebration" size={200} color="#FFF" />
// 				</TouchableOpacity>
// 			</View>
// 		</React.Fragment>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	button: {
// 		borderRadius: 200,
// 		backgroundColor: "#DDDDDD",
// 		padding: "44%",
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: "bold",
// 	},
// 	separator: {
// 		marginVertical: 30,
// 		height: 1,
// 		width: "80%",
// 	},
// });
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import Colors from "../utils/colors";

import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function TabTwoScreen() {
	return (
		<React.Fragment>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						console.log("Remove Ads Pressed!");
					}}
				>
					<Icon name="celebration" size={200} color="#FFF" />
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
