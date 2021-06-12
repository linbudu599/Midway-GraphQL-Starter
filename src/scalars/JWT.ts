import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

const validate = (value: any) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!JWS_REGEX.test(value)) {
    throw new TypeError(`Value is not a valid JWT: ${value}`);
  }

  return value;
};

export const GraphQLJWT = new GraphQLScalarType({
  name: 'JWT',

  description: 'JSON Web Token',

  serialize(value) {
    return validate(value);
  },

  parseValue(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as JWT but got a: ${ast.kind}`
      );
    }

    return validate(ast.value);
  },
});
