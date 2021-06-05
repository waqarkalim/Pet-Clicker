// import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

import * as Google from "expo-google-app-auth";
import firebase from "firebase";

export async function registration(email, password, lastName, firstName) {
	try {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				console.log("User signed in");
				console.log(result.additionalUserInfo);
				if (result.additionalUserInfo.isNewUser) {
					console.log("User is new user");
					firebase
						.database()
						.ref("/users/" + result.user.uid)
						.set({
							gmail: result.user.email,
							profile_picture:
								result.additionalUserInfo.profile.picture,
							locale: result.additionalUserInfo.profile.locale,
							first_name:
								result.additionalUserInfo.profile.given_name,
							last_name:
								result.additionalUserInfo.profile.family_name,
							created_at: Date.now(),
						})
						.then((snapshot) => {
							// console.log("snapshot", snapshot)
						});
					// console.log("User signed in!");
				} else {
					console.log("User is NOT new user");
					firebase
						.database()
						.ref("/users/" + result.user.uid)
						.update({
							last_logged_in: Date.now(),
						});
				}
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
		// const currentUser = firebase.auth().currentUser;

		// const db = firebase.firestore();
		// db.collection("users").doc(currentUser.uid).set({
		// 	email: currentUser.email,
		// 	lastName: lastName,
		// 	firstName: firstName,
		// });
	} catch (err) {
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function signIn(email, password) {
	try {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				console.log("User signed in");
				console.log(result.additionalUserInfo);
				if (result.additionalUserInfo.isNewUser) {
					console.log("User is new user");
					firebase
						.database()
						.ref("/users/" + result.user.uid)
						.set({
							gmail: result.user.email,
							profile_picture:
								result.additionalUserInfo.profile.picture,
							locale: result.additionalUserInfo.profile.locale,
							first_name:
								result.additionalUserInfo.profile.given_name,
							last_name:
								result.additionalUserInfo.profile.family_name,
							created_at: Date.now(),
						})
						.then((snapshot) => {
							// console.log("snapshot", snapshot)
						});
					// console.log("User signed in!");
				} else {
					console.log("User is NOT new user");
					firebase
						.database()
						.ref("/users/" + result.user.uid)
						.update({
							last_logged_in: Date.now(),
						});
				}
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	} catch (err) {
		Alert.alert("There is something wrong!", err.message);
	}
}

export async function loggingOut() {
	try {
		await firebase.auth().signOut();
	} catch (err) {
		Alert.alert("There is something wrong!", err.message);
	}
}

export function isUserEqual(googleUser, firebaseUser) {
	if (firebaseUser) {
		var providerData = firebaseUser.providerData;
		for (var i = 0; i < providerData.length; i++) {
			if (
				providerData[i].providerId ===
					firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
				providerData[i].uid === googleUser.getBasicProfile().getId()
			) {
				// We don't need to reauth the Firebase connection.
				return true;
			}
		}
	}
	return false;
}

export function onSignIn(googleUser) {
	console.log("Google Auth Response", googleUser);
	// We need to register an Observer on Firebase Auth to make sure auth is initialized.
	var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
		unsubscribe();
		// Check if we are already signed-in Firebase with the correct user.
		if (!isUserEqual(googleUser, firebaseUser)) {
			// Build Firebase credential with the Google ID token.
			var credential = firebase.auth.GoogleAuthProvider.credential(
				googleUser.idToken,
				googleUser.accessToken
				// googleUser.getAuthResponse().id_token
			);

			// Sign in with credential from the Google user.
			firebase
				.auth()
				.signInWithCredential(credential)
				.then((result) => {
					console.log("User signed in");
					console.log(result.additionalUserInfo);
					if (result.additionalUserInfo.isNewUser) {
						console.log("User is new user");
						firebase
							.database()
							.ref("/users/" + result.user.uid)
							.set({
								gmail: result.user.email,
								profile_picture:
									result.additionalUserInfo.profile.picture,
								locale: result.additionalUserInfo.profile
									.locale,
								first_name:
									result.additionalUserInfo.profile
										.given_name,
								last_name:
									result.additionalUserInfo.profile
										.family_name,
								created_at: Date.now(),
								isPaid: false,
							})
							.then((snapshot) => {
								// console.log("snapshot", snapshot)
							});
						// console.log("User signed in!");
					} else {
						console.log("User is NOT new user");
						firebase
							.database()
							.ref("/users/" + result.user.uid)
							.update({
								last_logged_in: Date.now(),
							});
					}
				})
				.catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// The email of the user's account used.
					var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					var credential = error.credential;
					// ...
				});
		} else {
			console.log("User already signed-in Firebase.");
		}
	});
}

export async function signInWithGoogleAsync() {
	try {
		const result = await Google.logInAsync({
			// androidClientId: YOUR_CLIENT_ID_HERE,
			behavior: "web",
			iosClientId:
				"693626776840-ncsmnepfa90tkpmje6qoasvusd783ghi.apps.googleusercontent.com",
			scopes: ["profile", "email"],
		});

		if (result.type === "success") {
			// console.log("Google Auth successful");
			onSignIn(result);
			return result.accessToken;
		} else {
			console.log("Google Auth cancelled");
			return { cancelled: true };
		}
	} catch (e) {
		console.log("Google Auth Error");
		return { error: true };
	}
}
