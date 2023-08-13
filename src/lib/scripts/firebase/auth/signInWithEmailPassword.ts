import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addUser } from "../db/createUser";

export async function _signInWithEmailAndPassword(email: string, password: string) {
	try {
		const trimmedEmail = email.replaceAll(/\s/g, ``);

		const { user } = await signInWithEmailAndPassword(auth, trimmedEmail, password);
		await addUser(user);
	} catch (e) {
		console.log("Failed to log in using email and password");
	}
}