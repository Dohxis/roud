export interface RodCheckContextInterface<ValueType> {
	attribute: string | undefined;
	value: ValueType;
}

export interface RodCheckInterface<ValueType> {
	failedMessage: (context: RodCheckContextInterface<ValueType>) => string;
	test: (context: RodCheckContextInterface<ValueType>) => boolean;
}

export class RodCheck<ValueType> {
	public constructor(private check: RodCheckInterface<ValueType>) {}

	public getFailedMessage(
		context: RodCheckContextInterface<ValueType>
	): string {
		return this.check.failedMessage(context);
	}

	public test(context: RodCheckContextInterface<ValueType>): boolean {
		return this.check.test(context);
	}
}
