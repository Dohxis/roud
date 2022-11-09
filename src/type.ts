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
import { capitalize } from "./utilities";

export interface RodTypeDefinition<Output> extends ZodTypeDef {
	checks: RodCheck<Output>[];
}

export abstract class RodType<Output = any, Input = Output> extends ZodType<
	Output,
	RodTypeDefinition<Output>,
	Input
> {
	protected abstract parsedType(): ZodParsedType;

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

		const expectedParsedType = this.parsedType();

		if (expectedParsedType !== this._getType(input)) {
			addIssueToContext(context, {
				code: ZodIssueCode.invalid_type,
				expected: expectedParsedType,
				received: context.parsedType,
			});

			return INVALID;
		}

		let anyFailedCheck = false;

		for (const check of this._def.checks) {
			const attribute = (input as any)["_key"];

			const humanReadableAttribute =
				attribute === undefined
					? undefined
					: capitalize(
							attribute
								.replace(
									/([A-Z])/g,
									(match: string) => ` ${match}`
								)
								.replace(/^./, (match: string) =>
									match.toUpperCase()
								)
								.trim()
					  );

			const checkContext: RodCheckContextInterface<Output> = {
				humanReadableAttribute,
				attribute,
				value: input.data,
			};

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
			value: input.data,
		};
	}
}
