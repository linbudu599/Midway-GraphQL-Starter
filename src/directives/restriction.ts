import {
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';

import { SchemaDirectiveVisitor } from 'graphql-tools';
import { ClassType } from 'type-graphql';

import {
  MaxLengthScalarType,
  MinLengthScalarType,
  GreaterThanScalarType,
  LessThanScalarType,
} from '../scalars/Limit';

/**
 *
 * Create Restriction Series Directives
 * @param {string} directiveName Directive Name(used in DSL)
 * @param {string} argName Argument Name That Received by Directive, e.g. `@max(max: 10)`
 * @param {TScalarType} ScalarType Custom Scalar Type Use to Limit Behaviour
 * @return {*}  {typeof SchemaDirectiveVisitor}
 */
const CreateRestrictionDirectiveMixin = <TScalarType extends ClassType>(
  directiveName: string,
  argName: string,
  ScalarType: TScalarType
): typeof SchemaDirectiveVisitor => {
  class RestrictionDirective extends SchemaDirectiveVisitor {
    visitInputFieldDefinition(
      field: GraphQLInputField,
      details: {
        objectType: GraphQLInputObjectType;
      }
    ) {
      this.wrapType(field);
    }

    visitFieldDefinition(
      field: GraphQLField<any, any>,
      details: {
        objectType: GraphQLObjectType | GraphQLInterfaceType;
      }
    ) {
      console.log(`@${directiveName} invoked at ${field.name}`);
      this.wrapType(field);
    }

    wrapType(field: GraphQLField<any, any> | GraphQLInputField) {
      if (
        field.type instanceof GraphQLNonNull &&
        field.type.ofType instanceof GraphQLScalarType
      ) {
        field.type = new GraphQLNonNull(
          new ScalarType(field.type.ofType, this.args[argName])
        );
      } else if (field.type instanceof GraphQLScalarType) {
        field.type = new ScalarType(field.type, this.args[argName]);
      } else {
        throw new Error(`Not a scalar type: ${field.type}`);
      }
    }
  }

  return RestrictionDirective;
};

export const MaxLengthDirective = CreateRestrictionDirectiveMixin(
  'maxLength',
  'max',
  MaxLengthScalarType
);

export const MinLengthDirective = CreateRestrictionDirectiveMixin(
  'minLength',
  'min',
  MinLengthScalarType
);

export const GreaterThanDirective = CreateRestrictionDirectiveMixin(
  'greater',
  'limit',
  GreaterThanScalarType
);

export const LessThanDirective = CreateRestrictionDirectiveMixin(
  'less',
  'limit',
  LessThanScalarType
);
