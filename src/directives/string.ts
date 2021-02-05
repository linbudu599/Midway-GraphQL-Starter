import {
  GraphQLField,
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLSchema,
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import {
  lowerCase,
  upperCase,
  camelCase,
  startCase,
  capitalize,
  kebabCase,
  trim,
  snakeCase,
} from 'lodash';

export type StringTransformer = (arg: string) => string;

/**
 *
 *
 * @param {string} directiveNameArg Directive Name Appeared In DSL
 * @param {StringTransformer} transformer string transformer function like `@lowerCase`
 * @return {*}  {typeof SchemaDirectiveVisitor}
 */
const CreateStringDirectiveMixin = (
  directiveNameArg: string,
  transformer: StringTransformer
): typeof SchemaDirectiveVisitor => {
  class StringDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (...args) => {
        console.log(
          `@${directiveNameArg} invoked on ${args[3].parentType}.${args[3].fieldName}`
        );
        const result = await resolve.apply(this, args);
        if (typeof result === 'string') {
          return transformer(result);
        }

        return result;
      };
    }

    public static getDirectiveDeclaration(
      directiveName: string,
      schema: GraphQLSchema
    ): GraphQLDirective {
      const previousDirective = schema.getDirective(directiveName);

      if (previousDirective) {
        return previousDirective;
      }

      return new GraphQLDirective({
        name: directiveNameArg,
        locations: [DirectiveLocation.FIELD_DEFINITION],
      });
    }
  }

  return StringDirective;
};

export const UpperDirective = CreateStringDirectiveMixin('upper', upperCase);

export const LowerDirective = CreateStringDirectiveMixin('lower', lowerCase);

export const CamelCaseDirective = CreateStringDirectiveMixin(
  'camelCase',
  camelCase
);

export const StartCaseDirective = CreateStringDirectiveMixin(
  'startCase',
  startCase
);

export const CapitalizeDirective = CreateStringDirectiveMixin(
  'capitalize',
  capitalize
);

export const KebabCaseDirective = CreateStringDirectiveMixin(
  'kebabCase',
  kebabCase
);

export const TrimDirective = CreateStringDirectiveMixin('trim', trim);

export const SnakeCaseDirective = CreateStringDirectiveMixin(
  'snake',
  snakeCase
);
