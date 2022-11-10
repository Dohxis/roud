import { RodError } from "../src/error";
import { r } from "../src/index";

describe("RodForm", () => {
	const FormSchema = r.form({
		accepted: r.boolean().accepted(),
		declined: r.boolean().declined(),
	});

	it("should parse() correctly", () => {
		expect(FormSchema.parse({ accepted: true, declined: false })).toEqual({
			accepted: true,
			declined: false,
		});
	});

	it("should throw on validation error on parse()", () => {
		expect(() =>
			FormSchema.parse({ accepted: false, declined: true })
		).toThrowError(RodError);
	});

	it("should safeParse() correctly", () => {
		const result = FormSchema.safeParse({
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
		const result = FormSchema.safeParse({
			accepted: false,
			declined: true,
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error).toBeInstanceOf(RodError);
		}
	});
});
