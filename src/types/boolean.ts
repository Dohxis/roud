import { ZodParsedType } from "zod";
import { RoudType } from "../type";

export class RoudBoolean extends RoudType<boolean> {
	static create() {
		return new RoudBoolean({
			checks: [],
		});
	}

	protected parsedType(): ZodParsedType {
		return ZodParsedType.boolean;
	}

	protected normalizeData(input: unknown): boolean | unknown {
		const truthyValues: unknown[] = ["yes", "on", "true", "1", 1, true];

		if (truthyValues.includes(input)) {
			return true;
		}

		const falsyValues: unknown[] = ["no", "off", "false", "0", 0, false];

		if (falsyValues.includes(input)) {
			return false;
		}

		return input;
	}

	public accepted() {
		return this.createCheck(RoudBoolean, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be accepted.`,
			test: ({ value }) => value === true,
		});
	}

	public acceptedIf(callback: () => boolean) {
		return this.createCheck(RoudBoolean, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be accepted.`,
			test: ({ value }) => (callback() ? value === true : true),
		});
	}

	public declined() {
		return this.createCheck(RoudBoolean, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be declined.`,
			test: ({ value }) => value === false,
		});
	}

	public declinedIf(callback: () => boolean) {
		return this.createCheck(RoudBoolean, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be declined.`,
			test: ({ value }) => (callback() ? value === false : true),
		});
	}
}
