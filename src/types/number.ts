import { ZodParsedType } from "zod";
import { RodType } from "../type";

export class RodNumber extends RodType<number> {
	static create() {
		return new RodNumber({
			checks: [],
		});
	}

	protected parsedType(): ZodParsedType {
		return ZodParsedType.number;
	}

	protected normalizeData(input: unknown): number | unknown {
		const number = Number(input);

		return isNaN(number) ? input : number;
	}

	public between(min: number, max: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be between ${min} and ${max}.`,
			test: ({ value }) => value >= min && value <= max,
		});
	}

	public digits(digits: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be ${digits} digits.`,
			test: ({ value }) => value.toString().length === digits,
		});
	}

	public betweenDigits(min: number, max: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be between ${min} and ${max} digits.`,
			test: ({ value }) =>
				value.toString().length >= min &&
				value.toString().length <= max,
		});
	}

	public max(number: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must not be greater than ${number}.`,
			test: ({ value }) => value < number,
		});
	}

	public maxDigits(digits: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must not have more than ${digits} digits.`,
			test: ({ value }) => value.toString().length < digits,
		});
	}

	public min(number: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must not be greater than ${number}.`,
			test: ({ value }) => value > number,
		});
	}

	public minDigits(digits: number) {
		return this.createCheck(RodNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must not have more than ${digits} digits.`,
			test: ({ value }) => value.toString().length > digits,
		});
	}
}
