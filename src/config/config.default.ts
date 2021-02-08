import { GetMiddlewareOptions } from 'apollo-server-koa/dist/ApolloServer';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';

import { IJWTConfig } from '../typing';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export type ExtendedConfig = DefaultConfig & {
  apollo: GetMiddlewareOptions;
  orm: ConnectionOptions;
  jwt: IJWTConfig;
};

export default (appInfo: EggAppInfo) => {
  const config = {} as ExtendedConfig;

  config.keys = appInfo.name + '_{{keys}}';

  config.apollo = {
    path: '/graphql',
  };

  config.jwt = {
    secretKey: 'YOUR_SECRET_KEY',
    excludePath: [],
    // excludePath: ['/api/token/', '/api/401'],
    passthrough: false,
  };

  config.salt = 20;

  config.orm = {
    type: 'sqlite',
    name: 'default',
    database: 'db.sqlite',
    synchronize: true,
    dropSchema: true,
    logger: 'advanced-console',
    entities: ['../entities/*'],
  };

  config.security = {
    csrf: false,
  };

  return config;
};
