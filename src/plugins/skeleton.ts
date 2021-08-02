import { PluginDefinition } from 'apollo-server-core';
import {
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextDidResolveSource,
  GraphQLRequestContextExecutionDidStart,
  GraphQLRequestContextParsingDidStart,
  GraphQLRequestContextResponseForOperation,
  GraphQLRequestContextValidationDidStart,
  GraphQLRequestContextWillSendResponse,
  GraphQLServiceContext,
} from 'apollo-server-plugin-base';

import { IContext } from '../typing';

// All supported plugin lifecycle are listed here
const PluginLifecycleSkeleton: PluginDefinition = {
  async serverWillStart(service: GraphQLServiceContext) {
    return {
      serverWillStop: async () => {},
    };
  },

  async requestDidStart(requestContext: GraphQLRequestContext<IContext>) {
    return {
      didResolveSource: async (
        reqCtx: GraphQLRequestContextDidResolveSource<IContext>
      ) => {},
      parsingDidStart: async (
        reqCtx: GraphQLRequestContextParsingDidStart<IContext>
      ) => {},
      validationDidStart: async (
        reqCtx: GraphQLRequestContextValidationDidStart<IContext>
      ) => {},
      didResolveOperation: async (
        reqCtx: GraphQLRequestContextDidResolveOperation<IContext>
      ) => {},
      didEncounterErrors: async (
        reqCtx: GraphQLRequestContextDidEncounterErrors<IContext>
      ) => {},
      responseForOperation: async (
        reqCtx: GraphQLRequestContextResponseForOperation<IContext>
      ) => null,
      executionDidStart: async (
        reqCtx: GraphQLRequestContextExecutionDidStart<IContext>
      ) => {},
      willSendResponse: async (
        reqCtx: GraphQLRequestContextWillSendResponse<IContext>
      ) => {},
    };
  },
};

export default PluginLifecycleSkeleton;
