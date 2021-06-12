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
    // "1623475767434" 带不带引号拿到的都是这个
    // ast.kind 基于传入的arg得到 因此只需要针对特定的解析即可
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    // if (ast.kind === Kind.STRING) {
    //   return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    // }
    return null; // Invalid hard-coded value (not an integer)}
  },
});
