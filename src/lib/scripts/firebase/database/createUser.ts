import { db } from "$lib/firebase";
import type { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import type { CalendarEvent, RepeatingCalendarEvent } from "scripts/types";

const firstEvent: CalendarEvent = {
	title: "Welcome",
	icon: "🥳",
	checked: false,
	colour: {
		border: "#cb9433",
		fill: "#fbf9f2"
	},
	date: {
		start: 0, // TODO set the start to today?
		end: 0,
		allDay: true
	},
	description: "Welcome to CalendarDB",
	customKeys: []
}

export async function createUser(user: User) {
	try {
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) return;

		await setDoc(docRef, {
			username: user.displayName ?? "User"
		});

		const eventRef = collection(docRef, "events");
		await addDoc(eventRef, firstEvent);

		// TODO add a default repeating event
		// TODO add daily, weekly and monthly note template

	} catch (e) {
		console.error(`Failed to create a user document for ${user.uid}`);
		console.error(e)
	}
}