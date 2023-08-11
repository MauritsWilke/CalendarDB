import { onAuthStateChanged, type User } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase";

function userStore() {
	let unsubscribe: () => void;

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		})

		return () => unsubscribe();
	})

	return { subscribe };
}

export const currentUser = userStore();