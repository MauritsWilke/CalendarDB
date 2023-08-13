import { auth } from "$lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUser } from "../db/createUser";

export async function signInWithGoogle() {
	try {
		const provider = new GoogleAuthProvider();
		const { user } = await signInWithPopup(auth, provider);
		await addUser(user);
	} catch (e) {
		console.log("Failed to log in using pop up");
	}
}