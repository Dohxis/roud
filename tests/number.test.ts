import { r } from "../src/index";

describe("RodNumber", () => {
	const Schema = r.schema({
		between: r.number().between(0, 10),
		digits: r.number().digits(5),
		betweenDigits: r.number().betweenDigits(0, 10),
		max: r.number().max(10),
		maxDigits: r.number().maxDigits(5),
		min: r.number().min(0),
		minDigits: r.number().minDigits(5),
	});

	it("should parse() correctly", () => {
		expect(
			Schema.parse({
				between: 5,
				digits: 12345,
				betweenDigits: 123,
				max: 5,
				maxDigits: 1,
				min: 1,
				minDigits: 123456789,
			})
		).toEqual({
			between: 5,
			digits: 12345,
			betweenDigits: 123,
			max: 5,
			maxDigits: 1,
			min: 1,
			minDigits: 123456789,
		});
	});

	it("should normalize data correctly", () => {
		expect(
			Schema.parse({
				between: "5",
				digits: "12345",
				betweenDigits: "123",
				max: "5",
				maxDigits: "1",
				min: "1",
				minDigits: "123456789",
			})
		).toEqual({
			between: 5,
			digits: 12345,
			betweenDigits: 123,
			max: 5,
			maxDigits: 1,
			min: 1,
			minDigits: 123456789,
		});

		expect(r.number().parse("10")).toBe(10);

		expect(r.number().parse("10.10")).toBe(10.1);

		expect(r.number().parse("10.00000000001")).toBe(10.00000000001);
	});
});
