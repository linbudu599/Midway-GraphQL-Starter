import { GraphQLSchema } from 'graphql';
import { PluginDefinition } from 'apollo-server-core';
import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from 'graphql-query-complexity';

import { MAX_ALLOWED_COMPLEXITY } from '../utils/constants';
import { IContext } from '../typing';

const complexityPlugin = (schema: GraphQLSchema): PluginDefinition => ({
  requestDidStart: (requestContext: GraphQLRequestContext<IContext>) => ({
    didResolveOperation({ request, document }) {
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
  }),
});

export default complexityPlugin;
