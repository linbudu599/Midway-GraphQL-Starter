import { Provide, Inject, App } from '@midwayjs/decorator';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import { Resolver, Query } from 'type-graphql';

import PrismaSample from '../graphql/prisma.type';
import { PrismaClient } from '../prisma/client';

@Provide()
@Resolver(of => PrismaSample)
export default class PrismaResolver {
  @App()
  app: IMidwayKoaApplication;

  // In GraphQL Resolver, you can get prisma client instance by directly inject(@Inject)
  // or inject to ApolloServer context, then get client @Ctx()
  @Inject('prisma')
  prisma: PrismaClient;

  @Query(returns => [PrismaSample])
  async PrismaSample() {
    console.log(this.prisma);
    return await this.prisma.prismaSampleModel.findMany();
  }
}
