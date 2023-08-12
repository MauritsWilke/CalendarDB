import { writable } from "svelte/store";
import { auth } from "$lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn(`No auth or not in browser`);
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe,
		}
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
	};
}

export const currentUser = userStore();