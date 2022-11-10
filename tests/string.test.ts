import { r } from "../src";
import { RoudError } from "../src/error";

describe("RoudString", () => {
	it("should parse() correctly", () => {
		expect(r.string().parse("string")).toEqual("string");
	});

	it("should throw with wrong values while parsing", () => {
		expect(() => r.string().parse(0)).toThrowError(RoudError);

		expect(() => r.string().parse(true)).toThrowError(RoudError);

		expect(() => r.string().parse({})).toThrowError(RoudError);

		expect(() => r.string().parse([])).toThrowError(RoudError);

		expect(() => r.string().parse(new Date())).toThrowError(RoudError);
	});

	it("should validate with onlyLetters()", () => {
		expect(r.string().onlyLetters().parse("stringąčęėįšųūž")).toEqual(
			"stringąčęėįšųūž"
		);

		expect(() => r.string().onlyLetters().parse("1")).toThrowError(
			RoudError
		);

		expect(() => r.string().onlyLetters().parse("string 1")).toThrowError(
			RoudError
		);

		expect(() => r.string().onlyLetters().parse("string_1")).toThrowError(
			RoudError
		);
	});

	it("should validate with onlyLettersAndNumbers()", () => {
		expect(
			r.string().onlyLettersAndNumbers().parse("stringąčęėįšųūž123")
		).toEqual("stringąčęėįšųūž123");

		expect(() =>
			r.string().onlyLettersAndNumbers().parse("stringąčęėįšųūž123-_")
		).toThrowError(RoudError);
	});

	it("should validate with onlyLettersNumbersAndDashes()", () => {
		expect(
			r
				.string()
				.onlyLettersNumbersAndDashes()
				.parse("stringąčęėįšųūž123-")
		).toEqual("stringąčęėįšųūž123-");

		expect(() =>
			r
				.string()
				.onlyLettersNumbersAndDashes()
				.parse("stringąčęėįšųūž123-_")
		).toThrowError(RoudError);
	});

	it("should validate with onlyLettersNumbersDashesAndUnderscores()", () => {
		expect(
			r
				.string()
				.onlyLettersNumbersDashesAndUnderscores()
				.parse("stringąčęėįšųūž123-_")
		).toEqual("stringąčęėįšųūž123-_");

		expect(() =>
			r
				.string()
				.onlyLettersNumbersDashesAndUnderscores()
				.parse("ĄČĘĖĮŠŲŪ()[]")
		).toThrowError(RoudError);
	});
});
