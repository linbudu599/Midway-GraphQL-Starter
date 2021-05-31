import * as path from 'path';
import { Provide, Config, App } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayKoaApplication } from '@midwayjs/koa';

import { ApolloServer, ServerRegistration } from 'apollo-server-koa';
import { buildSchemaSync } from 'type-graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import { UserRole } from '../utils/constants';
import { authChecker } from '../utils/authChecker';

import { IContext } from '../typing';

import ResolveTimeMiddleware from './resolve-time.graphql';

import complexityPlugin from '../plugins/complexity';
import { schemaPlugin, usagePlugin } from '../plugins/report';

import { InterceptorOnSpecificUser } from '../interceptors/graphql.interceptor';

import { extensionPlugin } from '../extensions/set-up-by-plugin';

import {
  UpperDirective,
  LowerDirective,
  CamelCaseDirective,
  StartCaseDirective,
  CapitalizeDirective,
  KebabCaseDirective,
  TrimDirective,
  SnakeCaseDirective,
} from '../directives/string';
import { AuthDirective } from '../directives/auth';
import { DateFormatDirective } from '../directives/dateFormat';
import { FetchDirective } from '../directives/fetch';

@Provide('GraphQLMiddleware')
export class GraphqlMiddleware implements IWebMiddleware {
  @Config('apollo')
  config: ServerRegistration;

  @App()
  app: IMidwayKoaApplication;

  resolve() {
    const container = this.app.getApplicationContext();
    const schema = buildSchemaSync({
      resolvers: [path.resolve(this.app.getBaseDir(), 'resolver/*')],
      container,
      authChecker,
      authMode: 'error',
      emitSchemaFile: 'schema.graphql',
      globalMiddlewares: [ResolveTimeMiddleware, InterceptorOnSpecificUser],
    });

    SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
      fetch: FetchDirective,
      date: DateFormatDirective,
      auth: AuthDirective,
      // string transform directives
      upper: UpperDirective,
      lower: LowerDirective,
      camel: CamelCaseDirective,
      start: StartCaseDirective,
      capitalize: CapitalizeDirective,
      kebab: KebabCaseDirective,
      snake: SnakeCaseDirective,
      trim: TrimDirective,
      // restriction directives
      // max: MaxLengthDirective,
      // min: MinLengthDirective,
      // greater: GreaterThanDirective,
      // less: LessThanDirective,
    });

    const server = new ApolloServer({
      schema,
      context: {
        currentReqUser: {
          role: UserRole.ADMIN,
        },
        container,
      } as IContext,
      plugins: [
        schemaPlugin(),
        usagePlugin(),
        complexityPlugin(schema),
        extensionPlugin(),
      ],
    });
    console.log('Apollo-GraphQL Invoke');

    return server.getMiddleware(this.config);
  }
}
