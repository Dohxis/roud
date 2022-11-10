import { RodError } from "../src/error";
import { r } from "../src/index";

describe("RodBoolean", () => {
	it("should normalize and parse truthy values correctly", () => {
		expect(r.boolean().parse("yes")).toEqual(true);

		expect(r.boolean().parse("on")).toEqual(true);

		expect(r.boolean().parse("true")).toEqual(true);

		expect(r.boolean().parse("1")).toEqual(true);

		expect(r.boolean().parse(1)).toEqual(true);

		expect(r.boolean().parse(true)).toEqual(true);
	});

	it("should normalize and parse falsy values correctly", () => {
		expect(r.boolean().parse("no")).toEqual(false);

		expect(r.boolean().parse("off")).toEqual(false);

		expect(r.boolean().parse("false")).toEqual(false);

		expect(r.boolean().parse("0")).toEqual(false);

		expect(r.boolean().parse(0)).toEqual(false);

		expect(r.boolean().parse(false)).toEqual(false);
	});

	it("should throw while parsing", () => {
		expect(() => r.boolean().parse("string")).toThrowError(RodError);

		expect(() => r.boolean().parse({})).toThrowError(RodError);

		expect(() => r.boolean().parse([])).toThrowError(RodError);

		expect(() => r.boolean().parse(new Date())).toThrowError(RodError);
	});

	it("should validate approved()", () => {
		expect(r.boolean().accepted().parse(true)).toEqual(true);

		expect(() => r.boolean().accepted().parse(false)).toThrowError(
			RodError
		);
	});

	it("should validate approvedIf()", () => {
		expect(
			r
				.boolean()
				.acceptedIf(() => true)
				.parse(true)
		).toEqual(true);

		expect(
			r
				.boolean()
				.acceptedIf(() => false)
				.parse(false)
		).toEqual(false);

		expect(() =>
			r
				.boolean()
				.acceptedIf(() => true)
				.parse(false)
		).toThrowError(RodError);
	});

	it("should validate declined()", () => {
		expect(r.boolean().declined().parse(false)).toEqual(false);

		expect(() => r.boolean().declined().parse(true)).toThrowError(RodError);
	});

	it("should validate declinedIf()", () => {
		expect(
			r
				.boolean()
				.declinedIf(() => true)
				.parse(false)
		).toEqual(false);

		expect(
			r
				.boolean()
				.declinedIf(() => false)
				.parse(true)
		).toEqual(true);

		expect(() =>
			r
				.boolean()
				.declinedIf(() => true)
				.parse(true)
		).toThrowError(RodError);
	});
});
