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

	public doesNotEndWith(string: string) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} may not end with ${string}.`,
			test: ({ value }) => !value.endsWith(string),
		});
	}

	public doesNotStartWith(string: string) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} may not start with ${string}.`,
			test: ({ value }) => !value.startsWith(string),
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

	public endsWith(string: string) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must end with ${string}.`,
			test: ({ value }) => value.endsWith(string),
		});
	}

	// The following regular expression was copied from https://stackoverflow.com/a/36760050
	// and matches only IPv4 addresses. In a future version, we should add support for
	// IPv6 addresses as well.
	public ipAddress() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be a valid IP address.`,
			test: ({ value }) =>
				new RegExp(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/).test(
					value
				),
		});
	}

	public json() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be a valid JSON string.`,
			test: ({ value }) => {
				try {
					JSON.parse(value);

					return true;
				} catch {
					return false;
				}
			},
		});
	}

	// The following regular expression was copied from https://stackoverflow.com/a/52970004
	public macAddress() {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be a valid MAC address.`,
			test: ({ value }) =>
				new RegExp(
					/^(?:(?:[0-9A-Fa-f]{2}(?=([-:]))(?:\1[0-9A-Fa-f]{2}){5}))$/
				).test(value),
		});
	}

	public notRegex(regExp: RegExp) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} format is invalid.`,
			test: ({ value }) => !regExp.test(value),
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

	public regex(regExp: RegExp) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} format is invalid.`,
			test: ({ value }) => regExp.test(value),
		});
	}

	public startsWith(string: string) {
		return this.createCheck(RoudString, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must start with ${string}.`,
			test: ({ value }) => value.startsWith(string),
		});
	}
}
