import {
  createParamDecorator,
  createMethodDecorator,
  ClassType,
  ArgumentValidationError,
  MiddlewareFn,
} from 'type-graphql';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { IContext } from '../typing';

export const InjectCurrentUser = () =>
  createParamDecorator<IContext>(({ context }) => context.currentReqUser);

// the same as this.app.getApplicationContext()
export const InjectCurrentContainer = () =>
  createParamDecorator<IContext>(({ context }) => context.container);

// eslint-disable-next-line @typescript-eslint/ban-types
export const CustomArgsValidation = <T extends object>(
  ValidateSchema: ClassType<T>
) => {
  const executeValidate: MiddlewareFn = async ({ args }, next) => {
    const ins = plainToClass(ValidateSchema, args);
    const validationErrors = await validate(ins);
    const hasValidationErrors = validationErrors.length > 0;

    if (hasValidationErrors) {
      throw new ArgumentValidationError(validationErrors);
    }

    return await next();
  };

  return createMethodDecorator(executeValidate);
};
