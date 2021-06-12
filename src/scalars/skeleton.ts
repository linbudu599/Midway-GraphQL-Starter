import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLScalarTypeExtensions,
  GraphQLScalarLiteralParser,
  Kind,
  ValueNode,
} from 'graphql';

export const __SkeletonScalar = new GraphQLScalarType({
  name: '',
  description: ' scalar type',
  // -> client
  // scalar's backend representation -> JSON-compatible format
  // (for ApolloServer to send)
  serialize(value: unknown) {
    return value;
  },
  // <- client
  // serialized JSON value -> scalar's backend representation
  // before added to resolver args
  // invoked when passed through GraphQL Variables($)
  parseValue(value: unknown) {
    return value;
  },
  // <- client query
  // query string includes hard-coded argument scalar value
  // call this method to convert value's AST representation -> scalar's back-end representation
  // ast.value is always string except:
  // BooleanValueNode ListValueNode ObjectFieldNode
  parseLiteral(ast: ValueNode) {
    return null;
  },
});
