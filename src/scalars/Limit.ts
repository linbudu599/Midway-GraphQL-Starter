import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export class MaxLengthScalarType extends GraphQLScalarType {
  constructor(type: GraphQLScalarType, maxLength: number) {
    super({
      name: `MaxLength_${maxLength}`,

      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `string` && value.length <= maxLength) {
          return serialized;
        }
        if (typeof value === `number` && !isNaN(value) && value <= maxLength) {
          return serialized;
        }
        throw new TypeError(`MaxLength Error: ${maxLength}`);
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}

export class MinLengthScalarType extends GraphQLScalarType {
  constructor(type: GraphQLScalarType, limit: number) {
    super({
      name: `MinLength_${limit}`,

      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `string` && value.length >= limit) {
          return serialized;
        }
        if (typeof value === `number` && !isNaN(value) && value >= limit) {
          return serialized;
        }
        throw new TypeError(`MinLength Error: ${limit}`);
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}

export class GreaterThanScalarType extends GraphQLScalarType {
  constructor(type: GraphQLScalarType, limit: number) {
    super({
      name: `GreaterThan_${limit}`,

      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `number` && !isNaN(value) && value > limit) {
          return serialized;
        }
        throw new TypeError(`GreaterThan Error: ${limit}`);
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}

export class LessThanScalarType extends GraphQLScalarType {
  constructor(type: GraphQLScalarType, limit: number) {
    super({
      name: `LessThan_${limit}`,

      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `number` && !isNaN(value) && value < limit) {
          return serialized;
        }
        throw new TypeError(`LessThen Error: ${limit}`);
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}
