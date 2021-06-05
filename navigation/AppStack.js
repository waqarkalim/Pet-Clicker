import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import TabOneScreen from "../screens/TabOneScreen";

import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function AppStack() {
	return (
		<Stack.Navigator>
			{/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
			<Stack.Screen name="Home" component={HomeScreen} />
			{/* <Stack.Screen name="TabOne" component={TabOneScreen} /> */}
		</Stack.Navigator>
	);
}
