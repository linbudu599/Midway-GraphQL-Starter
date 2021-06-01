import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';

/**
 * @deprecated use Apollo Plugin instead
 * @class CustomExtension
 * @implements {GraphQLExtension<IContext>}
 */
export class CustomExtension<IContext> implements GraphQLExtension<IContext> {
  constructor(public readonly args?: string) {}

  public willSendResponse(o: { graphqlResponse: GraphQLResponse }) {
    o.graphqlResponse.extensions = {
      ...o.graphqlResponse.extensions,
      FROM_CUSTOM_EXTENSION: '[Deprecated] FROM_CUSTOM_EXTENSION',
    };
  }
}
