import path from 'path';
import { ServerRegistration } from 'apollo-server-koa/dist/ApolloServer';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';

import UserEntity from '../entities/User.entity';
import ProfileEntity from '../entities/Profile.entity';
import PostEntity from '../entities/Post.entity';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export type ExtendedConfig = DefaultConfig & {
  apollo: Omit<ServerRegistration, 'app'>;
  orm: ConnectionOptions;
};

export default (appInfo: EggAppInfo) => {
  const config = {} as ExtendedConfig;

  config.keys = appInfo.name + '_{{keys}}';

  config.apollo = {
    path: '/graphql',
  };

  config.salt = 20;

  config.orm = {
    type: 'sqlite',
    name: 'default',
    database: 'db.sqlite',
    synchronize: true,
    dropSchema: true,
    logger: 'advanced-console',
    entities: [UserEntity, ProfileEntity, PostEntity],
  };

  // console.log(path.join(__dirname, '../entities/*'));

  config.security = {
    csrf: false,
  };

  return config;
};
