import { auth } from "$lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUser } from "scripts/firebase/database/createUser";

export async function signInWithGoogle() {
	try {
		const provider = new GoogleAuthProvider();
		const { user } = await signInWithPopup(auth, provider);
		await createUser(user);
	} catch (e) {
		console.log("Failed to log in using pop up");
	}
}