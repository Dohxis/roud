<p align="center">
  <img src="static/logo.png" width="200px" align="center" alt="Rod logo" />
  <h1 align="center">Rod</h1>
  <p align="center">
    Rod is a Laravel-inspired validation library built for Remix powered by Zod
  </p>
</p>

## Table of contents

-   [Installation](#installation)
-   [Basic usage](#basic-usage)
-   [Booleans](#booleans)
-   [Numbers](#numbers)
-   [Errors](#errors)

## Installation

### Requirements

Rod inherits requirements from Zod itself:

-   Typescript 4.1+

-   Strict mode activated

    ```ts
    // tsconfig.json
    {
    	// ...
    	"compilerOptions": {
    		// ...
    		"strict": true
    	}
    }
    ```

### Node

Zod is a peer dependency and must be installed alongside Rod.

```bash
npm install rod zod
```

### Basic usage

Rod fully extends Zod and for the most parts can be used outside of Remix. For simplicity reasons the following example will show how it should be used within Remix action.

```ts
import { ActionArgs } from "@remix-run/server-runtime";
import { r } from "rod";

const action = ({ request }: ActionArgs) => {
	const FormSchema = r.form({
		title: r.string(),
		quantity: r.number().min(0).max(10),
		termsOfService: r.boolean().accepted(),
	});

	const formData = FormSchema.parseRequestFormData(request);
	// Type ^
	// {
	//     title: string;
	//     quantity: number;
	//     termsOfService: boolean;
	// }
};
```

> If you used Zod before, `parseRequestFormData()` acts the same as `parse()` and throws `RodError` if validation fails. You can also use `safeParseRequestFormData` which instead of throwing will return either the data or `RodError`.

## Booleans

Accepts `true`, `"yes"`, `"on"`, `"true"` `"1"`, `1`, `false`, `"no"`, `"off"`, `"false"` `"0"`, `0` and normalizes the value to either `true` or `false`.

### Available validators

| Validator                             | Description                                                 |
| ------------------------------------- | ----------------------------------------------------------- |
| `accepted()`                          | Boolean must be `true`                                      |
| `acceptedIf(callback: () => boolean)` | Boolean must be `true` when `callback` evaluates to `true`  |
| `declined()`                          | Boolean must be `false`                                     |
| `declinedIf(callback: () => boolean)` | Boolean must be `false` when `callback` evaluates to `true` |

### Example

```ts
const FormSchema = r.form({
	termsOfService: r.boolean().accepted(),
});
```

## Numbers

| Validator                                 | Description                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `between(min: number, max: number)`       | Number must have a size between the given minimum and maximum (inclusive) |
| `digits(digits: number)`                  | Number must have an exact length of value                                 |
| `betweenDigits(min: number, max: number)` | Number must have a length between the given mininum and maximum           |
| `max(number: number)`                     | Number must be less than or equal to a maximum value                      |
| `maxDigits(digits: number)`               | Number must have a maximum length of value                                |
| `min(number: number)`                     | Number must have a minimum value                                          |
| `minDigits(digits: number)`               | Number must have a minimum length of value                                |

## Errors

Rod extends the default `ZodError` which simplifies passing errors back to the form. Here is an basic example:

```ts
import { ActionArgs } from "@remix-run/server-runtime";
import { r } from "rod";

const action = ({ request }: ActionArgs) => {
	const FormSchema = r.form({
		title: r.string(),
		quantity: r.number().min(0).max(10),
		termsOfService: r.boolean().accepted(),
	});

	const formDataResult = FormSchema.safeParseRequestFormData(request);

	if (formDataResult.success) {
		return json({ formData: formDataResult.data });
	}

	return json({ formDataErrors: formDataResult.error.getValidationErrors() });
	// Type ^
	// {
	//     title: ["The title must be a string."],
	//     quantity: [
	//         "The title must be a number.",
	//         "The quantity must be at least 0.",
	//         "The quantity must not be greater than 10.",
	//     ],
	//     termsOfService: [
	//         "The termsOfService must be a boolean.",
	//         "The termsOfService must be accepted.",
	//     ],
	// }
};
```
