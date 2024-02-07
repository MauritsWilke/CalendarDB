import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword as siweap } from "firebase/auth";

export async function signInWithEmailAndPassword(email: string, password: string) {
	try {
		const trimmedEmail = email.replaceAll(/\s/g, ``);

		await siweap(auth, trimmedEmail, password);
		// TODO Add user to database
	} catch (e) {
		console.log("Failed to log in using email and password");
	}
}