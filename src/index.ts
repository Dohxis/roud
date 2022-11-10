import { ZodObject } from "zod";
import { RodBoolean } from "./types/boolean";
import { RodSchema } from "./types/schema";
import { RodNumber } from "./types/number";

export const r = {
	boolean: RodBoolean.create,
	number: RodNumber.create,
	schema: RodSchema.create,
	object: ZodObject.create,
};
