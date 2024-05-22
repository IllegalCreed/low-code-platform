import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsStrongPasswordConstraint } from '../validators/is-strong-password.validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}
