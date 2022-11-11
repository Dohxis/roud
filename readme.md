<p align="center">
  <img src="static/logo.png" width="200px" align="center" alt="Roud logo" />
  <h1 align="center">Roud</h1>
  <p align="center">
    Roud is a Laravel-inspired validation library built for Remix powered by Zod
  </p>
</p>

## Table of contents

-   [Installation](#installation)
-   [Basic usage](#basic-usage)
-   [Booleans](#booleans)
-   [Numbers](#numbers)
-   [Strings](#strings)
-   [Errors](#errors)

## Installation

### Requirements

Roud inherits requirements from Zod itself:

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

Zod is a peer dependency and must be installed alongside Roud.

```bash
npm install roud zod
```

### Basic usage

Roud fully extends Zod and for the most parts can be used outside of Remix. For simplicity reasons the following example will show how it should be used within Remix action.

```ts
import { ActionArgs } from "@remix-run/server-runtime";
import { r } from "roud";

const action = async ({ request }: ActionArgs) => {
	const Schema = r.schema({
		title: r.string(),
		quantity: r.number().min(0).max(10),
		termsOfService: r.boolean().accepted(),
	});

	const formData = await Schema.parseRequestFormData(request);
	// Type ^
	// {
	//     title: string;
	//     quantity: number;
	//     termsOfService: boolean;
	// }
};
```

> If you used Zod before, `parseRequestFormData()` acts the same as `parse()` and throws `RoudError` if validation fails. You can also use `safeParseRequestFormData` which instead of throwing will return either the data or `RoudError`.

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
const Schema = r.schema({
	termsOfService: r.boolean().accepted(),
});
```

## Numbers

Accepts any value parsable by Javascript's `Number()` constructor and normalizes it to real number.

### Available validators

| Validator                                 | Description                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `between(min: number, max: number)`       | Number must have a size between the given minimum and maximum (inclusive) |
| `digits(digits: number)`                  | Number must have an exact length of value                                 |
| `digitsBetween(min: number, max: number)` | Number must have a length between the given mininum and maximum           |
| `integer()`                               | Number must be an integer                                                 |
| `max(number: number)`                     | Number must be less than or equal to a maximum value                      |
| `maxDigits(digits: number)`               | Number must have a maximum length of value                                |
| `min(number: number)`                     | Number must have a minimum value                                          |
| `minDigits(digits: number)`               | Number must have a minimum length of value                                |
| `multipleOf(number: number)`              | Number must must be a multiple of value                                   |

### Example

```ts
const Schema = r.schema({
	quantity: r.number().integer().between(0, 10),
	price: r.number().min(0),
});
```

## Strings

Accepts any string value.

### Available validators

| Validator                                  | Description                                                       |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `doesNotEndWith(string: string)`           | String must not end with a provided value                         |
| `doesNotStartWith(string: string)`         | String must not start with a provided value                       |
| `email()`                                  | String must be a valid email address                              |
| `endsWith(string: string)`                 | String must end with a provided value                             |
| `ipAddress()`                              | String must be a valid IPv4 address                               |
| `json()`                                   | String must be a valid JSON                                       |
| `macAddress()`                             | String must be a valid MAC address                                |
| `notRegex(regExp: RegExp)`                 | String must not match the given regular expression                |
| `onlyLetters()`                            | String must only contain letters                                  |
| `onlyLettersAndNumbers()`                  | String must only contain letters and numbers                      |
| `onlyLettersNumbersAndDashes()`            | String must only contain letters, numbers and dashes              |
| `onlyLettersNumbersDashesAndUnderscores()` | String must only contain letters, numbers, dashes and underscores |
| `regex(regExp: RegExp)`                    | String must match the given regular expression                    |
| `startsWith(string: string)`               | String must start with a provided value                           |
| `timeZone()`                               | String must be a valid time zone                                  |
| `url()`                                    | String must be a valid URL                                        |
| `uuid()`                                   | String must be a valid UUID                                       |

### Example

```ts
const Schema = r.schema({
	title: r.string().onlyLetters(),
	username: r.string().onlyLettersNumbersDashesAndUnderscores(),
});
```

## Errors

Roud extends the default `ZodError` which simplifies passing errors back to the form. Here is an basic example:

```ts
import { ActionArgs } from "@remix-run/server-runtime";
import { r } from "roud";

const action = async ({ request }: ActionArgs) => {
	const Schema = r.schema({
		title: r.string(),
		quantity: r.number().min(0).max(10),
		termsOfService: r.boolean().accepted(),
	});

	const formDataResult = await Schema.safeParseRequestFormData(request);

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
