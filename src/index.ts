import { RoudBoolean } from "./types/boolean";
import { RoudSchema } from "./types/schema";
import { RoudNumber } from "./types/number";
import { RoudString } from "./types/string";

export const r = {
	boolean: RoudBoolean.create,
	number: RoudNumber.create,
	schema: RoudSchema.create,
	string: RoudString.create,
};
