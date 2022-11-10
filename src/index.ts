import { ZodObject } from "zod";
import { RoudBoolean } from "./types/boolean";
import { RoudSchema } from "./types/schema";
import { RoudNumber } from "./types/number";

export const r = {
	boolean: RoudBoolean.create,
	number: RoudNumber.create,
	schema: RoudSchema.create,
	object: ZodObject.create,
};
