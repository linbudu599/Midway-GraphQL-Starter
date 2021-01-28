import chalk from 'chalk';
import { MiddlewareFn } from 'type-graphql';

const GraphQLResolveTimeMiddleware: MiddlewareFn = async (
  { root, args, context, info },
  next
) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  console.log(
    chalk.green(
      `[GraphQL Resolve Time] <${info.operation.operation.toLocaleUpperCase()}> on ${
        info.parentType.name
      }.${info.fieldName} : [${resolveTime} ms]`
    )
  );
};

export default GraphQLResolveTimeMiddleware;
