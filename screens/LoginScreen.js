import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

import Colors from "../constants/Colors";
import SafeView from "../components/SafeView";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import FormButton from "../components/Forms/FormButton";
import AppButton from "../components/AppButton";
import IconButton from "../components/IconButton";
import { loginWithEmail } from "../components/Firebase/firebase";
import FormErrorMessage from "../components/Forms/FormErrorMessage";
import useStatusBar from "../hooks/useStatusBar";

import useColorScheme from "../hooks/useColorScheme";
import {
	signIn,
	isUserEqual,
	onSignIn,
	signInWithGoogleAsync,
} from "../API/firebaseMethods";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Please enter a registered email")
		.email()
		.label("Email"),
	password: Yup.string()
		.required()
		.min(6, "Password must have at least 6 characters")
		.label("Password"),
});

export default function LoginScreen({ navigation }) {
	const colorScheme = useColorScheme();
	useStatusBar("light-content");

	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [rightIcon, setRightIcon] = useState("eye");
	const [loginError, setLoginError] = useState("");

	const styles = StyleSheet.create({
		container: {
			padding: 15,
			backgroundColor: Colors[colorScheme].background,
		},
		footerButtonContainer: {
			marginVertical: 15,
			justifyContent: "center",
			alignItems: "center",
		},
		forgotPasswordButtonText: {
			color: Colors[colorScheme].black,
			fontSize: 18,
			fontWeight: "600",
		},
		backButton: {
			justifyContent: "center",
			alignItems: "center",
		},
	});
	function handlePasswordVisibility() {
		if (rightIcon === "eye") {
			setRightIcon("eye-off");
			setPasswordVisibility(!passwordVisibility);
		} else if (rightIcon === "eye-off") {
			setRightIcon("eye");
			setPasswordVisibility(!passwordVisibility);
		}
	}

	async function handleOnLogin(values) {
		const { email, password } = values;

		try {
			await loginWithEmail(email, password);
		} catch (error) {
			setLoginError(error.message);
		}
	}

	return (
		<SafeView style={styles.container}>
			<Form
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={(values) => handleOnLogin(values)}
			>
				<FormField
					name="email"
					leftIcon="email"
					placeholder="Enter email"
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoFocus={true}
				/>
				<FormField
					name="password"
					leftIcon="lock"
					placeholder="Enter password"
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={passwordVisibility}
					textContentType="password"
					rightIcon={rightIcon}
					handlePasswordVisibility={handlePasswordVisibility}
				/>
				<FormButton title={"Login"} />
				<AppButton
					title={"Sign In With Google"}
					onPress={() => signInWithGoogleAsync()}
					color="secondary"
				/>
				{<FormErrorMessage error={loginError} visible={true} />}
			</Form>
			<View style={styles.footerButtonContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate("ForgotPassword")}
				>
					<Text style={styles.forgotPasswordButtonText}>
						Forgot Password?
					</Text>
				</TouchableOpacity>
			</View>
			<IconButton
				style={styles.backButton}
				iconName="keyboard-backspace"
				color={Colors[colorScheme].black}
				size={30}
				onPress={() => navigation.goBack()}
			/>
		</SafeView>
	);
}
