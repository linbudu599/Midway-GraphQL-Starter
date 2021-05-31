import { GraphQLField, defaultFieldResolver, GraphQLString } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import numeral from 'numeral';

const defaultFormat = '0,0';

export class NumberFormat extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { format = defaultFormat } = this.args;

    field.resolve = async (...args) => {
      console.log(
        `@number invoked on ${args[3].parentType}.${args[3].fieldName}`
      );
      const result = await resolve.apply(this, args);
      if (
        typeof result === 'string' &&
        result.indexOf('0') === -1 &&
        !Number.isNaN(result)
      ) {
        return numeral(result).format(format) ?? result;
      }
    };
    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;
  }
}
