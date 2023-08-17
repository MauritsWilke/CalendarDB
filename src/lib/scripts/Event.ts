import { updateDoc, type QueryDocumentSnapshot, doc, getDoc } from "firebase/firestore";
import type { CalendarEvent, ColourHex } from "./types";
import { db } from "$lib/firebase";
import { getFill } from "./utils/index";

export class Event {
	private _data: CalendarEvent;
	#docRef;

	constructor(event: QueryDocumentSnapshot<CalendarEvent>) {
		this._data = event.data();
		this.#docRef = doc(db, event.ref.path);
	}

	get data() {
		return this._data
	}

	async setTitle(title: string) {
		try {
			await updateDoc(this.#docRef, {
				title: title
			});
			this._data.title = title;
		} catch (e) {
			console.log(e);
			return Promise.reject(new Error(`Failed to update the document.`))
		}
	}

	async setIcon(icon: string) {
		const isOneEmoji = icon.match(/\p{Emoji_Presentation}/gu)?.length === 1;
		if (!isOneEmoji) return Promise.reject(new Error(`Icon must be one (1) emoji.`));

		try {
			await updateDoc(this.#docRef, {
				icon: icon
			})
			this._data.icon = icon;
		} catch (e) {
			console.log(e);
			return Promise.reject(new Error(`Failed to update the document.`))
		}
	}

	async setColour(border: string, fill?: string) {
		const borderIsHex = /^#[0-9A-F]{6}$/.test(border);
		if (!borderIsHex) return Promise.reject(new Error(`Colours provided must be a hex code.`));

		if (fill) {
			const fillIsHex = /^#[0-9A-F]{6}$/.test(fill);
			if (!fillIsHex) return Promise.reject(new Error(`Colours provided must be a hex code.`));
		} else {
			fill = getFill(border);
		}

		try {
			await updateDoc(this.#docRef, {
				colour: {
					border: border,
					fill: fill
				}
			})
			this._data.colour = {
				border: border as ColourHex,
				fill: fill as ColourHex
			}
		} catch (e) {
			console.log(e);
			return Promise.reject(new Error(`Failed to update the document.`))
		}
	}

	async setChecked(toggled: boolean) {
		try {
			await updateDoc(this.#docRef, {
				checked: toggled
			})
			this._data.checked = toggled;
		} catch (e) {
			console.log(e);
			return Promise.reject(new Error(`Failed to update the document.`))
		}
	}

	async setDate(date: { start?: number, end?: number, allDay?: boolean }) {
		if (!Object.values(date).length) return Promise.reject(new Error("At least one value must be updated"));

		try {
			await updateDoc(this.#docRef, {
				date: {
					start: date?.start === undefined ? this._data.date.start : date.start,
					end: date?.end === undefined ? this._data.date.end : date.end,
					allDay: date?.allDay === undefined ? this._data.date.allDay : date.allDay
				}
			})
			if (date?.start !== undefined) this._data.date.start = date.start
			if (date?.end !== undefined) this._data.date.end = date.end
			if (date?.allDay !== undefined) this._data.date.allDay = date.allDay

		} catch (e) {
			console.log(e);
			return Promise.reject(new Error(`Failed to update the document.`))
		}
	}

	async refetchEvent() {
		try {
			const res = await getDoc(this.#docRef);
			if (!res) return Promise.reject(new Error("Failed to fetch data from Firestore"));
			this._data = res.data() as CalendarEvent;
		} catch (e) {
			console.log(e);
			return Promise.reject(new Error(`Failed to fetch the document.`))
		}
		return this.data;
	}
}