import { RoudError } from "../src/error";
import { r } from "../src/index";

describe("RoudNumber", () => {
	const Schema = r.schema({
		between: r.number().between(0, 10),
		digits: r.number().digits(5),
		digitsBetween: r.number().digitsBetween(0, 10),
		integer: r.number().integer(),
		max: r.number().max(10),
		maxDigits: r.number().maxDigits(5),
		min: r.number().min(0),
		minDigits: r.number().minDigits(5),
		multipleOf: r.number().multipleOf(5),
	});

	it("should parse() correctly", () => {
		expect(
			Schema.parse({
				between: 5,
				digits: 12345,
				digitsBetween: 123,
				integer: 123,
				max: 5,
				maxDigits: 1,
				min: 1,
				minDigits: 123456789,
				multipleOf: 10,
			})
		).toEqual({
			between: 5,
			digits: 12345,
			digitsBetween: 123,
			integer: 123,
			max: 5,
			maxDigits: 1,
			min: 1,
			minDigits: 123456789,
			multipleOf: 10,
		});
	});

	it("should normalize data correctly", () => {
		expect(
			Schema.parse({
				between: "5",
				digits: "12345",
				digitsBetween: "123",
				integer: "123",
				max: "5",
				maxDigits: "1",
				min: "1",
				minDigits: "123456789",
				multipleOf: "10",
			})
		).toEqual({
			between: 5,
			digits: 12345,
			digitsBetween: 123,
			integer: 123,
			max: 5,
			maxDigits: 1,
			min: 1,
			minDigits: 123456789,
			multipleOf: 10,
		});

		expect(r.number().parse("10")).toBe(10);

		expect(r.number().parse("10.10")).toBe(10.1);

		expect(r.number().parse("10.00000000001")).toBe(10.00000000001);
	});

	it("should only accept integers when using validators .digits(), .digitsBetween(), .maxDigits(), .minDigits()", () => {
		expect(r.number().digits(1).parse(1)).toBe(1);

		expect(() => r.number().digits(1).parse(1.1)).toThrowError(RoudError);

		expect(r.number().digitsBetween(1, 2).parse(1)).toBe(1);

		expect(() => r.number().digitsBetween(1, 2).parse(1.1)).toThrowError(
			RoudError
		);

		expect(r.number().maxDigits(2).parse(1)).toBe(1);

		expect(() => r.number().maxDigits(2).parse(1.1)).toThrowError(
			RoudError
		);

		expect(r.number().minDigits(2).parse(12)).toBe(12);

		expect(() => r.number().minDigits(2).parse(12.1)).toThrowError(
			RoudError
		);
	});

	it("should throw error when using .integer() validator with non-integer", () => {
		expect(() => r.number().integer().parse(1.1)).toThrowError(RoudError);
	});

	it("should throw error when using .multipleOf() validator with non-multiple step number", () => {
		expect(() => r.number().multipleOf(5).parse(14.9)).toThrowError(
			RoudError
		);
	});
});
