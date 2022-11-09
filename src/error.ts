import { ZodError } from "zod";

export class RodError<T extends any> extends ZodError<T> {
	constructor(private validationErrors: Record<string, string[]>) {
		super([]);
	}

	public getValidationErrors() {
		return this.validationErrors;
	}
}
