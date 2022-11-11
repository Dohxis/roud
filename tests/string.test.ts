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

	it("should validate with doesNotStartWith()", () => {
		expect(r.string().doesNotStartWith("end").parse("startEnd")).toEqual(
			"startEnd"
		);

		expect(() =>
			r.string().doesNotStartWith("start").parse("startEnd")
		).toThrowError(RoudError);
	});

	it("should validate with doesNotEndWith()", () => {
		expect(r.string().doesNotEndWith("end").parse("endStart")).toEqual(
			"endStart"
		);

		expect(() =>
			r.string().doesNotEndWith("Start").parse("endStart")
		).toThrowError(RoudError);
	});

	it("should validate with email()", () => {
		expect(r.string().email().parse("email@email.com")).toEqual(
			"email@email.com"
		);

		expect(() => r.string().email().parse("emailemail.com")).toThrowError(
			RoudError
		);
	});

	it("should validate with endsWith()", () => {
		expect(r.string().endsWith("End").parse("startEnd")).toEqual(
			"startEnd"
		);

		expect(() =>
			r.string().endsWith("End").parse("startStart")
		).toThrowError(RoudError);
	});

	it("should validate with ipAddress()", () => {
		expect(r.string().ipAddress().parse("1.1.1.1")).toEqual("1.1.1.1");

		expect(() => r.string().ipAddress().parse("01.01.01.01")).toThrowError(
			RoudError
		);
	});

	it("should validate with json()", () => {
		expect(r.string().json().parse('{"name": "name"}')).toEqual(
			'{"name": "name"}'
		);

		expect(() => r.string().json().parse('{"name": name}')).toThrowError(
			RoudError
		);
	});

	it("should validate with macAddress()", () => {
		expect(r.string().macAddress().parse("3D:F2:C9:A6:B3:4F")).toEqual(
			"3D:F2:C9:A6:B3:4F"
		);

		expect(() =>
			r.string().macAddress().parse("3D;F2:C9;A6:B3:4F")
		).toThrowError(RoudError);
	});

	it("should validate with notRegex()", () => {
		expect(
			r
				.string()
				.notRegex(/^[a-z]+$/)
				.parse("123")
		).toEqual("123");

		expect(() =>
			r
				.string()
				.notRegex(/^[a-z]+$/)
				.parse("abc")
		).toThrowError(RoudError);
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

	it("should validate with regex()", () => {
		expect(
			r
				.string()
				.regex(/^[a-z]+$/)
				.parse("abc")
		).toEqual("abc");

		expect(() =>
			r
				.string()
				.regex(/^[a-z]+$/)
				.parse("123")
		).toThrowError(RoudError);
	});

	it("should validate with startsWith()", () => {
		expect(r.string().startsWith("start").parse("startEnd")).toEqual(
			"startEnd"
		);

		expect(() =>
			r.string().startsWith("Start").parse("startStart")
		).toThrowError(RoudError);
	});

	it("should validate with url()", () => {
		expect(r.string().url().parse("http://example.com")).toEqual(
			"http://example.com"
		);

		expect(() => r.string().url().parse("not.url")).toThrowError(RoudError);
	});
});
