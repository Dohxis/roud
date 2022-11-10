import { ZodParsedType } from "zod";
import { RodType } from "../type";

export class RodBoolean extends RodType<boolean> {
	static create() {
		return new RodBoolean({
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
		return this.createCheck(RodBoolean, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be accepted.`,
			test: ({ value }) => value === true,
		});
	}

	public declined() {
		return this.createCheck(RodBoolean, {
			failedMessage: ({ attribute }) =>
				`The ${attribute} must be declined.`,
			test: ({ value }) => value === false,
		});
	}
}
