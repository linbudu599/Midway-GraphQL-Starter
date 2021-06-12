import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

const validate = (value: any) => {
  const parsed = typeof value === 'string' ? parseInt(value, 10) : value;

  if (typeof parsed !== 'number' || Number.isNaN(parsed)) {
    throw new TypeError(`Value is not a number: ${value}`);
  }

  if (parsed === Infinity || parsed === -Infinity) {
    throw new TypeError(`Value is not a finite number: ${value}`);
  }

  if (parsed <= 0 || parsed > 65535) {
    throw new TypeError(`Value is not a valid TCP port: ${value}`);
  }

  return parsed;
};

export const GraphQLPort = new GraphQLScalarType({
  name: 'Port',

  description: 'TCP port (0 - 65535)',

  serialize(value) {
    return validate(value);
  },

  parseValue(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as TCP ports but got a: ${ast.kind}`
      );
    }

    return validate(ast.value);
  },
});
