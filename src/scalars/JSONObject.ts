import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ensureObject, parseObject } from './utils/helper';

export const GraphQLJSONObjectConfig: GraphQLScalarTypeConfig<
  Record<string, unknown>,
  Record<string, unknown>
> = {
  name: 'JSONObject',
  description:
    'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: ensureObject,
  parseValue: ensureObject,
  parseLiteral: parseObject,
  specifiedByUrl:
    'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
};

export const GraphQLJSONObject = new GraphQLScalarType(GraphQLJSONObjectConfig);
