import * as path from 'path';
import { Provide, Config, App } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaApplication,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

import { ApolloServer, ServerRegistration } from 'apollo-server-koa';
import { buildSchemaSync } from 'type-graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import { UserRole } from '../utils/constants';
import { authChecker } from '../utils/authChecker';

import { IContext } from '../typing';

import ResolveTimeMiddleware from './resolve-time.graphql';

import complexityPlugin from '../plugins/complexity';
import { schemaPlugin, usagePlugin } from '../plugins/report';
import { cachePlugin } from '../plugins/cache';

import { InterceptorOnSpecificUser } from '../interceptors/graphql.interceptor';

import { extensionPlugin } from '../extensions/apollo-plugin';
import { CustomExtension } from '../extensions/graphql-extension';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';

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
import {
  MaxLengthDirective,
  MinLengthDirective,
  GreaterThanDirective,
  LessThanDirective,
} from '../directives/restriction';
import { getConnection } from 'typeorm';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';

@Provide('GraphQLMiddleware')
export class GraphqlMiddleware implements IWebMiddleware {
  @Config('apollo')
  config: ServerRegistration;

  @App()
  app: IMidwayKoaApplication;

  resolve() {
    return async (_ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
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
        max: MaxLengthDirective,
        min: MinLengthDirective,
        greater: GreaterThanDirective,
        less: LessThanDirective,
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
          cachePlugin(true, {}),
          // FIXME: DataLoader Integration
          // ApolloServerLoaderPlugin({
          //   typeormGetConnection: getConnection, // for use with TypeORM
          // }),
          process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageGraphQLPlayground({
                settings: {
                  'editor.theme': 'dark',
                  'editor.reuseHeaders': true,
                  'editor.fontSize': 14,
                  'editor.fontFamily': '"Fira Code"',
                  'schema.polling.enable': true,
                  'schema.polling.interval': 5000,
                  'tracing.hideTracingResponse': false,
                  'queryPlan.hideQueryPlanResponse': false,
                },
              }),
        ],
        // introspection: true,
      });
      await server.start();

      console.log('Apollo-GraphQL Start');

      server.applyMiddleware({
        app: this.app,
        ...this.config,
      });

      await next();
    };
  }
}
