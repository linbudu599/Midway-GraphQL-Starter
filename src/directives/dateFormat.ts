import { GraphQLField, defaultFieldResolver, GraphQLString } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import DateFormatter from 'dateformat';

const defaultFormat = 'mmmm d, yyyy';
export class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { format = defaultFormat } = this.args;

    // Enable Client Control By Create Args Dynamically
    // field.args.push({
    //   name: "format",
    //   type: GraphQLString,
    // });

    // field.resolve = async function (
    //   source,
    //   { format, ...otherArgs },
    //   context,
    //   info
    // ) {
    //   const date = await resolve.call(this, source, otherArgs, context, info);

    //   return DateFormatter(date, format || defaultFormat);
    // };

    field.resolve = async (...args) => {
      console.log(
        `@date invoked on ${args[3].parentType}.${args[3].fieldName}`
      );
      const date = await resolve.apply(this, args);
      return DateFormatter(date, format);
    };
    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;
  }
}
