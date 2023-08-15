import { Calendar } from "$lib/scripts/Calendar";
import { describe, expect, it } from "vitest";

describe("calendar suite", () => {
	const cal = new Calendar();

	it("should get content of a given date", () => {
		const res = cal.getDay();

	});

	it("should get contents of a range of dates", () => {
		const res = cal.getRange();

	})
})