import { GetMiddlewareOptions } from 'apollo-server-koa/dist/ApolloServer';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export type ExtendedConfig = DefaultConfig & {
  apollo: GetMiddlewareOptions;
  orm: ConnectionOptions;
};

export default (appInfo: EggAppInfo) => {
  const config = {} as ExtendedConfig;

  config.keys = appInfo.name + '_{{keys}}';

  config.apollo = {
    path: '/graphql',
  };

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
