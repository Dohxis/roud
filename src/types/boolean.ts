import { ZodParsedType } from "zod";
import { RodType } from "../type";

export class RodBoolean extends RodType<boolean> {
	protected parsedType(): ZodParsedType {
		return ZodParsedType.boolean;
	}

	static create() {
		return new RodBoolean({
			checks: [],
		});
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
