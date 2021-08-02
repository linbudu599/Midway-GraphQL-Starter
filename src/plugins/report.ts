import {
  ApolloServerPluginUsageReporting,
  ApolloServerPluginSchemaReporting,
} from 'apollo-server-core';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

// API Schema
export const schemaPlugin = (): ApolloServerPlugin =>
  process.env.APOLLO_KEY ? ApolloServerPluginSchemaReporting() : {};

// API各operation与field的使用状况
export const usagePlugin = (): ApolloServerPlugin =>
  process.env.APOLLO_KEY
    ? ApolloServerPluginUsageReporting({
        sendVariableValues: { all: true },
        sendHeaders: { all: true },
        sendReportsImmediately: true,
      })
    : {};
