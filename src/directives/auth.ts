import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLField,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

// A copy of your enum schema
export const enum AuthDirectiveRoleEnum {
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN',
}

type AuthEnumMembers = keyof typeof AuthDirectiveRoleEnum;

type AuthGraphQLObjectType = GraphQLObjectType & {
  _requiredAuthRole: AuthEnumMembers;
  _authFieldsWrapped: boolean;
};

type AuthGraphQLField<T, K> = GraphQLField<T, K> & {
  _requiredAuthRole: AuthEnumMembers;
};

// Get user type from token or other things
const getUser = async (token: string): Promise<AuthEnumMembers[]> => {
  return [AuthDirectiveRoleEnum.USER];
};

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: AuthGraphQLObjectType) {
    console.log(`@auth invoked at visitObject ${type.name}`);
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  // 字段/参数级别的指令同样能够访问其父级类型
  visitFieldDefinition(
    field: AuthGraphQLField<any, any>,
    details: {
      objectType: AuthGraphQLObjectType;
    }
  ) {
    console.log(`@auth invoked at visitFieldDefinition ${field.name}`);

    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType: AuthGraphQLObjectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    // 在对象类型上新增_authFieldsWrapped, 避免重复标识
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    // The fields of ObjectType that triggered by directives
    // 指令触发的对象类型本次查询中携带的字段
    const fields = objectType.getFields() as unknown as AuthGraphQLField<
      any,
      any
    >[];

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName] as AuthGraphQLField<any, any>;
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (...args) => {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        // 字段级别的优先 如果没有才去查对象类型上的(细粒度鉴权)
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        console.log('requiredRole: ', requiredRole);

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        // const context = args[2];
        // const userRoles = await getUser(context?.headers?.authToken ?? "");

        // if (!userRoles.includes(requiredRole)) {
        //   throw new Error("not authorized");
        // }

        return resolve.apply(this, args);
      };
    });
  }

  public static getDirectiveDeclaration(
    directiveName: string,
    schema: GraphQLSchema
  ): GraphQLDirective {
    console.log(directiveName);
    const previousDirective = schema.getDirective(directiveName);
    // console.log('previousDirective: ', previousDirective);
    if (previousDirective) {
      // 如果这个指令已经存在 直接修改它即可
      // if exist, modify it
      previousDirective.args.forEach(arg => {
        if (arg.name === 'requires') {
          arg.defaultValue = 'REVIEWER';
        }
      });

      return previousDirective;
    }

    // or, return a new instance
    // 否则返回一个新的实例
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.OBJECT, DirectiveLocation.FIELD_DEFINITION],
      // 这个参数是map而不是数组
      // a map instead of an array
      args: {
        requires: {
          // Having the schema available here is important for obtaining
          // references to existing type objects, such as the AuthDirectiveRoleEnum enum.
          // this enum must be used in schema, or it will not be registered into generated schema
          // 这个enum必须被使用 否则不会被注册进TypeGraphQL生成的schema中
          type: schema.getType('AuthDirectiveRoleEnum') as GraphQLEnumType,
          // Set the default minimum Role to REVIEWER.
          defaultValue: 'USER',
        },
      },
    });
  }
}
