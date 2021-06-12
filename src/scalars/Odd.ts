import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export function processOddValue(value: number) {
  return value % 2 === 1 ? value : null;
}

export const OddScalar = new GraphQLScalarType({
  name: 'Odd',
  description: 'odd scalar type',
  serialize(value: unknown) {
    if (typeof value !== 'number') {
      throw new Error(`Expect number, got ${value}`);
    }
    return processOddValue(value);
  },
  parseValue(value: unknown) {
    if (typeof value !== 'number') {
      throw new Error(`Expect number, got ${value}`);
    }
    return processOddValue(value);
  },
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return processOddValue(parseInt(ast.value, 10));
    }
    return null;
  },
});
