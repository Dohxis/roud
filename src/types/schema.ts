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
import { RoudError } from "../error";
import { customParse, customSafeParse } from "../parsing";

type UnknownKeysParam = "passthrough" | "strict" | "strip";

type SafeParseErrorType<Input> = {
	success: false;
	error: RoudError<Input>;
};

type SafeParseReturnType<Input, Output> =
	| SafeParseSuccess<Output>
	| SafeParseErrorType<Input>;

export class RoudSchema<
	T extends ZodRawShape,
	UnknownKeys extends UnknownKeysParam = "strip",
	Catchall extends ZodTypeAny = ZodTypeAny,
	Output = objectOutputType<T, Catchall>,
	Input = objectInputType<T, Catchall>
> extends ZodObject<T, UnknownKeys, Catchall, Output, Input> {
	static create = <T extends ZodRawShape>(shape: T): RoudSchema<T> => {
		return new RoudSchema({
			shape: () => shape,
			unknownKeys: "strip",
			catchall: ZodNever.create(),
			typeName: ZodFirstPartyTypeKind.ZodObject,
		});
	};

	public parse(data: unknown): Output {
		const result = super.safeParse(data);

		return customParse(result);
	}

	public safeParse(data: unknown): SafeParseReturnType<Input, Output> {
		const result = super.safeParse(data);

		return customSafeParse(result);
	}
}
