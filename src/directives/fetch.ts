import { defaultFieldResolver, GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import fetch from 'node-fetch';

export class FetchDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { url } = this.args;
    field.resolve = async (...args) => {
      const fetchRes = await fetch(url);
      console.log(
        `@fetch invoked on ${args[3].parentType}.${args[3].fieldName}`
      );
      console.log(`Fetch Status: ${fetchRes.status}`);
      const result = await resolve.apply(this, args);
      return result;
    };
  }
}
