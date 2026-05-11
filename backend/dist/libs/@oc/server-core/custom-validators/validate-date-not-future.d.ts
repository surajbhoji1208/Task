import { IDynamicValidationOptions } from "../interfaces";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class ValidateDateNotFutureConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateDateNotFuture(validationOptions?: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
