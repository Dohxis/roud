export interface RoudCheckContextInterface<ValueType> {
	attribute: string | undefined;
	value: ValueType;
}

export interface RoudCheckInterface<ValueType> {
	failedMessage: (context: RoudCheckContextInterface<ValueType>) => string;
	test: (context: RoudCheckContextInterface<ValueType>) => boolean;
}

export class RoudCheck<ValueType> {
	public constructor(private check: RoudCheckInterface<ValueType>) {}

	public getFailedMessage(
		context: RoudCheckContextInterface<ValueType>
	): string {
		return this.check.failedMessage(context);
	}

	public test(context: RoudCheckContextInterface<ValueType>): boolean {
		return this.check.test(context);
	}
}
