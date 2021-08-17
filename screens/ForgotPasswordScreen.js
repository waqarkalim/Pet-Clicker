import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Colors from "../constants/Colors";
import SafeView from "../components/SafeView";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import FormButton from "../components/Forms/FormButton";
import IconButton from "../components/IconButton";
import { passwordReset } from "../components/Firebase/firebase";
import FormErrorMessage from "../components/Forms/FormErrorMessage";
import useStatusBar from "../hooks/useStatusBar";

import useColorScheme from "../hooks/useColorScheme";
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label("Email")
		.email("Enter a valid email")
		.required("Please enter a registered email"),
});

export default function ForgotPasswordScreen({ navigation }) {
	const colorScheme = useColorScheme();
	useStatusBar("light-content");

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			padding: 15,
			backgroundColor: Colors[colorScheme].background,
		},
		backButton: {
			justifyContent: "center",
			alignItems: "center",
			marginVertical: 10,
		},
	});
	const [customError, setCustomError] = useState("");

	async function handlePasswordReset(values) {
		const { email } = values;

		try {
			await passwordReset(email);
			navigation.navigate("Welcome");
		} catch (error) {
			setCustomError(error.message);
		}
	}

	return (
		<SafeView style={styles.container}>
			<Form
				initialValues={{ email: "" }}
				validationSchema={validationSchema}
				onSubmit={(values) => handlePasswordReset(values)}
			>
				<FormField
					name="email"
					leftIcon="email"
					placeholder="Enter email"
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					// autoFocus={true}
				/>
				<FormButton title="Forgot Password" />
				{<FormErrorMessage error={customError} visible={true} />}
			</Form>
			<IconButton
				style={styles.backButton}
				iconName="keyboard-backspace"
				color={Colors.white}
				size={30}
				onPress={() => navigation.goBack()}
			/>
		</SafeView>
	);
}
