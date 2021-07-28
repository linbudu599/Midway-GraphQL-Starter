import {
  MiddlewareFn,
  MiddlewareInterface,
  NextFn,
  ResolverData,
} from 'type-graphql';

export interface IContext {}

export const FunctionalMiddleware: MiddlewareFn<IContext> = async (
  { root, args, context, info },
  next
) => {
  await next();
};

export const GuargsMiddleware: MiddlewareFn<IContext> = async (
  { root, args, context, info },
  next
) => {
  throw new Error('Guards Invoked!');
};

export const FactoryMiddleware = (): MiddlewareFn<IContext> => {
  return async ({ root, args, context, info }, next) => {
    await next();
  };
};

export class ClassMiddleware implements MiddlewareInterface<IContext> {
  constructor() {}

  async use(
    { root, args, context, info }: ResolverData<IContext>,
    next: NextFn
  ) {
    return next();
  }
}
