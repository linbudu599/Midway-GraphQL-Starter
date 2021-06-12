import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { identity, parseLiteral } from './utils/helper';

export const GraphQLJSONConfig: GraphQLScalarTypeConfig<any, any> = {
  name: 'JSON',
  description:
    'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: identity,
  parseValue: identity,
  parseLiteral,
  specifiedByUrl:
    'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
};

export const GraphQLJSON = new GraphQLScalarType(GraphQLJSONConfig);
