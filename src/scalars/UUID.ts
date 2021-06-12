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
import { v4 as uuidv4, validate } from 'uuid';

// scalars:
// Date
// Odd
// EnhancedOriginScalars by lodash
// creator of enhanced scalars
// camelcase cases?
// List/Map/Set/...
// Void
// JSON
// SuperJSON
// UUID
// URL
// Email
// Phone
// ... common regex ?
// IP
// Hex
// Port

export const UUIDScalar = new GraphQLScalarType({
  name: 'UUID',
  description: 'uuid scalar type',
  // -> client
  serialize(value: string): string {
    if (typeof value !== 'string' || !validate(value)) {
      throw new Error(`Invalid value for UUID ${value}`);
    }
    return value;
  },
  // <- client
  parseValue(value: string): string {
    if (typeof value !== 'string' || !validate(value)) {
      throw new Error(`Invalid value for UUID ${value}`);
    }
    return value;
  },
  // <- client query
  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING && validate(ast.value)) {
      return ast.value;
    } else {
      return null;
    }
  },
});
