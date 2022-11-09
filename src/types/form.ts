import {
	objectInputType,
	objectOutputType,
	SafeParseSuccess,
	ZodFirstPartyTypeKind,
	ZodNever,
	ZodObject,
	ZodRawShape,
	ZodTypeAny,
} from "zod";
import { RodError } from "../error";

type UnknownKeysParam = "passthrough" | "strict" | "strip";

type SafeParseErrorType<Input> = {
	success: false;
	error: RodError<Input>;
};

type SafeParseReturnType<Input, Output> =
	| SafeParseSuccess<Output>
	| SafeParseErrorType<Input>;

export class RodForm<
	T extends ZodRawShape,
	UnknownKeys extends UnknownKeysParam = "strip",
	Catchall extends ZodTypeAny = ZodTypeAny,
	Output = objectOutputType<T, Catchall>,
	Input = objectInputType<T, Catchall>
> extends ZodObject<T, UnknownKeys, Catchall, Output, Input> {
	static create = <T extends ZodRawShape>(shape: T): RodForm<T> => {
		return new RodForm({
			shape: () => shape,
			unknownKeys: "strip",
			catchall: ZodNever.create(),
			typeName: ZodFirstPartyTypeKind.ZodObject,
		});
	};

	public parse(data: unknown): Output {
		const result = super.safeParse(data);

		if (result.success) {
			return result.data;
		}

		const errors: Record<string, string[]> = result.error.errors.reduce(
			(previousValue, currentValue) => ({
				...previousValue,
				[currentValue.path[0]]: currentValue.message,
			}),
			{}
		);

		throw new RodError(errors);
	}

	public safeParse(data: unknown): SafeParseReturnType<Input, Output> {
		try {
			const result = this.parse(data);

			return {
				success: true,
				data: result,
			};
		} catch (error) {
			return {
				success: false,
				error: error as RodError<Input>,
			};
		}
	}
}
