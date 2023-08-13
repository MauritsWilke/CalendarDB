import { db } from "$lib/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import type { CalendarEvent } from "$lib/scripts/types";
import type { User } from "firebase/auth";

const firstEvent: CalendarEvent = {
	title: "Welcome",
	icon: "🥳",
	checked: false,
	colour: {
		border: "#cb9433",
		fill: "#fbf9f2"
	},
	date: {
		start: 0,
		end: null,
		allDay: true
	},
	customKeys: []
}

export async function addUser(user: User) {
	try {
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			await setDoc(docRef, {
				username: user.displayName ?? "User",
			});

			const eventRef = collection(docRef, "events");
			await addDoc(eventRef, firstEvent);
		}
	} catch (e) {
		console.log(`Failed to create a user document for ${user.uid}`);
	}
}