import { describe, expect, it } from 'vitest'
import { double } from "scripts/index.js";

describe("first test", () => {
	it("should double a number", () => {
		expect(double(2)).toEqual(4);
	})
})