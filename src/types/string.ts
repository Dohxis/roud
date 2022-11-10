import { ZodParsedType } from "zod";
import { RoudType } from "../type";

export class RoudString extends RoudType<string> {
	static create() {
		return new RoudString({
			checks: [],
		});
	}

	protected parsedType(): ZodParsedType {
		return ZodParsedType.string;
	}

	public onlyLetters() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must only contain letters.`,
			test: ({ value }) => new RegExp(/^[\p{L}\p{M}]+$/, "u").test(value),
		});
	}

	public onlyLettersAndNumbers() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must only contain letters and numbers.`,
			test: ({ value }) =>
				new RegExp(/^[\p{L}\p{M}\p{N}]+$/, "u").test(value),
		});
	}

	public onlyLettersNumbersAndDashes() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must only contain letters, numbers and dashes.`,
			test: ({ value }) =>
				new RegExp(/^[\p{L}\p{M}\p{N}-]+$/, "u").test(value),
		});
	}

	public onlyLettersNumbersDashesAndUnderscores() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must only contain letters, numbers, dashes and underscores.`,
			test: ({ value }) =>
				new RegExp(/^[\p{L}\p{M}\p{N}_-]+$/, "u").test(value),
		});
	}
}
