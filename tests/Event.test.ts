import { db } from "$lib/firebase";
import { Event } from "$lib/scripts/Event";
import type { CalendarEvent } from "$lib/scripts/types";
import { QueryDocumentSnapshot, collection, doc, getDocs } from "firebase/firestore";
import { describe, expect, it } from "vitest";

const UID = "2cDcODQESCfqSKfMNRE45wiVd7q1";

describe("event suite", async () => {
	// Temp setup :)
	const docRef = doc(db, "users", UID);
	const colRef = collection(docRef, "events");
	const events = await getDocs(colRef);
	const e = events.docs[0] as QueryDocumentSnapshot<CalendarEvent>;
	const event = new Event(e);

	it("should update the event title", async () => {
		const newTitle = `Vitest :D ${Date.now()}`

		await event.setTitle(newTitle);
		await event.refetchEvent();
		expect(event.data.title).toBe(newTitle);
	})

	it("should update the event icon", async () => {
		const randomEmojis = ["🎃", "🎁", "🐈", "🛒", "🥭", "🍎", "🍏", "🍅", "🍇", "🍈"]
		const newIcon = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

		expect(async () => await event.setIcon("😸🐱‍👤")).rejects.toThrowError(/(1)/);

		await event.setIcon(newIcon);
		await event.refetchEvent();
		expect(event.data.icon).toBe(newIcon);
	})

	it("should update the colour", async () => {
		const newHex = "#6C9B7D";
		const expectedFill = "#E3EFE5";

		expect(async () => await event.setColour("#FakeHex")).rejects.toThrowError(/hex/);

		await event.setColour(newHex);
		expect(event.data.colour.border).toBe(newHex);
		expect(event.data.colour.fill).toBe(expectedFill);
	})

	it("should toggle checked", async () => {
		await event.setChecked(true);
		await event.refetchEvent();
		expect(event.data.checked).toBe(true);

		await event.setChecked(false);
		await event.refetchEvent();
		expect(event.data.checked).toBe(false);
	})

	it("should update the date", async () => {
		const startDate = Date.now();
		const endDate = Date.now() + 1 * 60 * 60 * 1000;

		expect(async () => await event.setDate({})).rejects.toThrowError(/one/);

		await event.setDate({ allDay: true })
		await event.refetchEvent();
		expect(event.data.date.allDay).toBe(true);
		await event.refetchEvent();
		await event.setDate({ allDay: false });
		expect(event.data.date.allDay).toBe(false);

		await event.setDate({ start: startDate, end: endDate });
		await event.refetchEvent();
		expect(event.data.date.start).toBe(startDate);
		expect(event.data.date.end).toBe(endDate);
		expect(event.data.date.allDay).toBe(false);
	})
})