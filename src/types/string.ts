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

	public doesNotEndWith(string: string | string[]) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute, value }) =>
				`The ${attribute} may not end with ${
					Array.isArray(string)
						? string.find((singleString) =>
								value.endsWith(singleString)
						  )
						: string
				}.`,
			test: ({ value }) =>
				Array.isArray(string)
					? string.every(
							(singleString) => !value.endsWith(singleString)
					  )
					: !value.endsWith(string),
		});
	}

	public doesNotStartWith(string: string | string[]) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute, value }) =>
				`The ${attribute} may not start with ${
					Array.isArray(string)
						? string.find((singleString) =>
								value.startsWith(singleString)
						  )
						: string
				}.`,
			test: ({ value }) =>
				Array.isArray(string)
					? string.every(
							(singleString) => !value.startsWith(singleString)
					  )
					: !value.startsWith(string),
		});
	}

	// Following validator is based from original Zod implemantation
	// https://github.com/colinhacks/zod/blob/82e72ad359a0758e8bba69794c2880bb6d96be1e/src/types.ts#L527
	public email() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be a valid email address.`,
			test: ({ value }) =>
				new RegExp(
					/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
					"i"
				).test(value),
		});
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
