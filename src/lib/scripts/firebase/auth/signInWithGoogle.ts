import { auth } from "$lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function signInWithGoogle() {
	try {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
		// TODO Add user to database
	} catch (e) {
		console.log("Failed to log in using pop up");
	}
}