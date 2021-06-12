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

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'date scalar type',
  // -> client
  serialize(value: Date) {
    return value.getTime();
  },
  // <- client
  parseValue(value: string) {
    return new Date(value);
  },
  // <- client query
  parseLiteral(ast: ValueNode, vars: Record<string, unknown>) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)}
  },
});
