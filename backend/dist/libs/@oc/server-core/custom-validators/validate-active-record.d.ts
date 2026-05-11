import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces/dynamic-validation-option.interface";
import { EntityTarget } from "typeorm";
export declare class ValidateActiveRecordConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateActiveRecord<T>(entityTarget: EntityTarget<T>, validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
