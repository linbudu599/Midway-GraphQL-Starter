import { Provide, Inject, App } from '@midwayjs/decorator';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { IMidwayWebApplication } from '@midwayjs/web';

import { Resolver, Query, Mutation, FieldResolver, Root } from 'type-graphql';

@Provide()
@Resolver()
export default class SampleResolver {
  @App()
  app: IMidwayKoaApplication;

  @Query()
  async QueryHandler() {}

  @Mutation()
  async MutationHandler() {}

  @FieldResolver()
  async FieldResolver(@Root() rootType: unknown) {}
}
