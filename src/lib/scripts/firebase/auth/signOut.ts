import { auth } from "$lib/firebase";
import { signOut } from "firebase/auth";

export async function _signOut() {
	try {
		await signOut(auth);
		console.log("Signed out");
	} catch (e) {
		console.log(`Failed to sign out`);
	}
}