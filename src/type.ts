import {
	addIssueToContext,
	INVALID,
	ParseInput,
	ParseReturnType,
	ZodIssueCode,
	ZodParsedType,
	ZodType,
	ZodTypeDef,
} from "zod";
import { RodCheck, RodCheckContextInterface, RodCheckInterface } from "./check";
import {
	customParse,
	customSafeParse,
	CustomSafeParseReturnType,
} from "./parsing";

export interface RodTypeDefinition<Output> extends ZodTypeDef {
	checks: RodCheck<Output>[];
}

export abstract class RodType<Output = any, Input = Output> extends ZodType<
	Output,
	RodTypeDefinition<Output>,
	Input
> {
	protected abstract parsedType(): ZodParsedType;

	protected normalizeData(input: unknown): Output | unknown {
		return input as Output | unknown;
	}

	protected createCheck<Type extends RodType>(
		Type: new (args: RodTypeDefinition<Output>) => Type,
		check: RodCheckInterface<Output>
	) {
		return new Type({
			...this._def,
			checks: [...this._def.checks, new RodCheck(check)],
		});
	}

	_parse(input: ParseInput): ParseReturnType<Output> {
		const context = this._getOrReturnCtx(input);

		const normalizedInput: ParseInput = {
			...input,
			data: this.normalizeData(input.data),
		};

		const attribute = (normalizedInput as any)["_key"];

		const currentType = this._getType(normalizedInput);

		const requiredTypes = this.parsedType();

		if (currentType !== requiredTypes) {
			addIssueToContext(context, {
				code: ZodIssueCode.custom,
				message: `The ${attribute} field must be of type ${requiredTypes}.`,
			});

			return INVALID;
		}

		const checkContext: RodCheckContextInterface<Output> = {
			attribute,
			value: normalizedInput.data,
		};

		let anyFailedCheck = false;

		for (const check of this._def.checks) {
			if (!check.test(checkContext)) {
				anyFailedCheck = true;

				addIssueToContext(context, {
					code: ZodIssueCode.custom,
					message: check.getFailedMessage(checkContext),
				});
			}
		}

		return {
			status: anyFailedCheck ? "dirty" : "valid",
			value: normalizedInput.data,
		};
	}

	public parse(data: unknown): Output {
		const result = super.safeParse(data);

		return customParse(result);
	}

	public safeParse(data: unknown): CustomSafeParseReturnType<Input, Output> {
		const result = super.safeParse(data);

		return customSafeParse(result);
	}
}
