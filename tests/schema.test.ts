import { RoudError } from "../src/error";
import { r } from "../src/index";

describe("RoudSchema", () => {
	const Schema = r.schema({
		accepted: r.boolean().accepted(),
		declined: r.boolean().declined(),
	});

	it("should parse() correctly", () => {
		expect(Schema.parse({ accepted: true, declined: false })).toEqual({
			accepted: true,
			declined: false,
		});
	});

	it("should throw on validation error on parse()", () => {
		expect(() =>
			Schema.parse({ accepted: false, declined: true })
		).toThrowError(RoudError);
	});

	it("should safeParse() correctly", () => {
		const result = Schema.safeParse({
			accepted: true,
			declined: false,
		});

		expect(result.success).toBe(true);

		if (result.success) {
			expect(result.data).toEqual({
				accepted: true,
				declined: false,
			});
		}
	});

	it("should return validation error on safeParse()", () => {
		const result = Schema.safeParse({
			accepted: false,
			declined: true,
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error).toBeInstanceOf(RoudError);
		}
	});
});
