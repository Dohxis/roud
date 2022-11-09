import { ZodObject } from "zod";
import { RodBoolean } from "./types/boolean";
import { RodForm } from "./types/form";
import { RodNumber } from "./types/number";

export const r = {
	boolean: RodBoolean.create,
	number: RodNumber.create,
	form: RodForm.create,
	object: ZodObject.create,
};
