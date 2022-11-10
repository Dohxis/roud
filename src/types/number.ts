import { ZodParsedType } from "zod";
import { RoudType } from "../type";

export class RoudNumber extends RoudType<number> {
	static create() {
		return new RoudNumber({
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
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be between ${min} and ${max}.`,
			test: ({ value }) => value >= min && value <= max,
		});
	}

	public digits(digits: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute, value }) =>
				Number.isSafeInteger(value)
					? `The ${attribute} must be ${digits} digits.`
					: `The ${attribute} must be an integer.`,
			test: ({ value }) =>
				Number.isSafeInteger(value) &&
				value.toString().length === digits,
		});
	}

	public digitsBetween(min: number, max: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute, value }) =>
				Number.isSafeInteger(value)
					? `The ${attribute} must be between ${min} and ${max} digits.`
					: `The ${attribute} must be an integer.`,
			test: ({ value }) =>
				Number.isSafeInteger(value) &&
				value.toString().length >= min &&
				value.toString().length <= max,
		});
	}

	public integer() {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be an integer.`,
			test: ({ value }) => Number.isSafeInteger(value),
		});
	}

	public max(number: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must not be greater than ${number}.`,
			test: ({ value }) => value < number,
		});
	}

	public maxDigits(digits: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute, value }) =>
				Number.isSafeInteger(value)
					? `The ${attribute} must not have more than ${digits} digits.`
					: `The ${attribute} must be an integer.`,
			test: ({ value }) =>
				Number.isSafeInteger(value) && value.toString().length < digits,
		});
	}

	public min(number: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must not be greater than ${number}.`,
			test: ({ value }) => value >= number,
		});
	}

	public minDigits(digits: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute, value }) =>
				Number.isSafeInteger(value)
					? `The ${attribute} must not have less than ${digits} digits.`
					: `The ${attribute} must be an integer.`,
			test: ({ value }) =>
				Number.isSafeInteger(value) &&
				value.toString().length >= digits,
		});
	}

	public multipleOf(number: number) {
		return this.createCheck(RoudNumber, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be a multiple of ${number}.`,
			// Following validator is based from original Zod implemantation
			// https://github.com/colinhacks/zod/blob/c617ad3edbaf42971485f00042751771c335f9aa/src/types.ts#L752
			test: ({ value }) => {
				const valueDecimalsCount = (
					value.toString().split(".")[1] || ""
				).length;

				const stepDecimalsCount = (
					number.toString().split(".")[1] || ""
				).length;

				const decimalsCount =
					valueDecimalsCount > stepDecimalsCount
						? valueDecimalsCount
						: stepDecimalsCount;

				const valueInteger = parseInt(
					value.toFixed(decimalsCount).replace(".", "")
				);

				const stepInteger = parseInt(
					number.toFixed(decimalsCount).replace(".", "")
				);

				const floatSafeRemaider =
					(valueInteger % stepInteger) / Math.pow(10, decimalsCount);

				return floatSafeRemaider === 0;
			},
		});
	}
}
