import { SafeParseReturnType, SafeParseSuccess } from "zod";
import { RodError } from "./error";

type SafeParseErrorType<Input> = {
	success: false;
	error: RodError<Input>;
};

export type CustomSafeParseReturnType<Input, Output> =
	| SafeParseSuccess<Output>
	| SafeParseErrorType<Input>;

export const customParse = <Output = any, Input = Output>(
	data: SafeParseReturnType<Input, Output>
): Output => {
	if (data.success) {
		return data.data;
	}

	const errors: Record<string, string[]> = data.error.errors.reduce(
		(previousValue, currentValue) => ({
			...previousValue,
			[currentValue.path[0]]: currentValue.message,
		}),
		{}
	);

	throw new RodError(errors);
};

export const customSafeParse = <Output = any, Input = Output>(
	data: SafeParseReturnType<Input, Output>
): CustomSafeParseReturnType<Input, Output> => {
	try {
		const result = customParse(data);

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
};
