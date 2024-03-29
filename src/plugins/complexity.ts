import { GraphQLSchema } from 'graphql';
import {
  GraphQLRequestContext,
  ApolloServerPlugin,
} from 'apollo-server-plugin-base';
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from 'graphql-query-complexity';

import { MAX_ALLOWED_COMPLEXITY } from '../utils/constants';
import { IContext } from '../typing';

const complexityPlugin = (schema: GraphQLSchema): ApolloServerPlugin => ({
  requestDidStart: async (requestContext: GraphQLRequestContext<IContext>) => {
    return {
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName!,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity > MAX_ALLOWED_COMPLEXITY) {
          throw new Error(
            `Sorry, too complicated query! ${complexity} is over ${MAX_ALLOWED_COMPLEXITY} that is the max allowed complexity.`
          );
        }
        console.log('Used query complexity points:', complexity);
      },
    };
  },
});

export default complexityPlugin;
