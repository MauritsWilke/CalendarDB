import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword as siweap } from "firebase/auth";
import { createUser } from "scripts/firebase/database/createUser";

export async function signInWithEmailAndPassword(email: string, password: string) {
	try {
		const trimmedEmail = email.replaceAll(/\s/g, ``);

		const { user } = await siweap(auth, trimmedEmail, password);
		await createUser(user);
	} catch (e) {
		console.log("Failed to log in using email and password");
	}
}