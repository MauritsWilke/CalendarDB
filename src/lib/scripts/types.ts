export type Views = "day" | "week" | "month" | "table";

type CustomKey =
	{ type: "string", value: string } |
	{ type: "number", value: number } |
	{ type: "date", value: number } | // In epoch milliseconds
	{ type: "checkbox", value: boolean } |
	{ type: "URL", value: URL } | // TODO maybe type string fits better
	{ type: "email", value: string } |
	{ type: "phone", value: string } |
	{ type: "colour", value: string } |
	{ type: "icon", value: string }; // Yet to decide

export type CalendarEvent = {
	title: string,
	icon: string,
	checked: boolean,
	colour: {
		border: string,
		fill: string | null // If there is no fill, generate one automatically
	},
	date: {
		allDay: boolean, // If an event is all day, just set start and end to 8am-9am by default?
		start: number, // Both in epoch milliseconds
		end: number,
	},
	description: "Welcome to CalendarDB!",
	customKeys: CustomKey[]
}


// TODO find the best way to use the date property from CalendarEvent
export type RepeatingCalendarEvent = CalendarEvent & {
	repeat: {
		frequency: Frequency,
		selector: string
	},
	bounds: {
		start: number, // Again in, you guessed it, epoch milliseconds
		end: number,
	}
}

type Frequency = "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY" | "INTERVAL" | "LASTDAY";
/* Explanation
* daily -> repeat every day (mon-tue-wed...)
	rule = FREQ=DAILY
	repeats every day

* weekly -> repeat at the same day of the week (mon-mon-mon...)
	lets you select which days of the week to repeat

	rule = FREQ=WEEKLY;INTERVAL=MON-TUE-THU
	repeats on every monday, tuesday and thursday

* biweekly -> repeat at the same day of the week every 2 weeks (mon- -mon...)
	rule = FREQ=BIWEEKLY;INTERVAL=MON-FRI
	repeats monday and friday every other week
* monthly -> repeat at the same day of the month every month (26th-26th-26th) !! edge cases, februari and 28th
	lets you select which days of the month to repeat

	rule = FREQ=MONTHLY;INTERVAL=15-16
	repeats on the 15th and 16th of each month
* yearly -> repeat at the same day of the month every year (26,2020-26,2021-26,2022...) !! edge cases -> leap years
	rule = FREQ=YEARLY
	repeats every year on the same day
* interval -> repeat every X days (eg mon-wed-fri...)
	rule = FREQ=INTERVAL;INTERVAl=3
	repeats every 3rd day (MON,tue,wed,THU,fri,sat,SUN...)
* lastday -> repeat at the last day of the month
	rule = FREQ=LASTDAY
	repeats the last day of each month
*/