import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginCacheControlDisabled,
} from 'apollo-server-core';
import type { ApolloServerPluginCacheControlOptions } from 'apollo-server-core';
import type { ApolloServerPlugin } from 'apollo-server-plugin-base';

export const cachePlugin = (
  enable?: boolean,
  options?: ApolloServerPluginCacheControlOptions
): ApolloServerPlugin => {
  return enable
    ? ApolloServerPluginCacheControl(options)
    : ApolloServerPluginCacheControlDisabled();
};
