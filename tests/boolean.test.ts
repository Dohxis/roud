import { r } from "../src/index";

describe("RodBoolean", () => {
	it("should parse correctly", () => {
		expect(r.boolean().parse(true)).toEqual(true);

		expect(r.boolean().parse(true)).toEqual(true);
	});

	it("should throw while parsing", () => {
		expect(() => r.boolean().parse("string")).toThrow();

		expect(() => r.boolean().parse(0)).toThrow();

		expect(() => r.boolean().parse({})).toThrow();

		expect(() => r.boolean().parse([])).toThrow();

		expect(() => r.boolean().parse(new Date())).toThrow();
	});

	it("should validate approved", () => {
		expect(r.boolean().accepted().parse(true)).toEqual(true);

		expect(() => r.boolean().accepted().parse(false)).toThrow();
	});

	it("should validate declined", () => {
		expect(r.boolean().declined().parse(false)).toEqual(false);

		expect(() => r.boolean().declined().parse(true)).toThrow();
	});
});
