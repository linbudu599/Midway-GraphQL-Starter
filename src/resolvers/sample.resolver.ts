import { Provide, Inject, App } from '@midwayjs/decorator';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { Resolver, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';

import { Sample } from '../graphql/sample.type';
import { IContext } from '../typing';

import { v4 as uuidv4 } from 'uuid';

@Provide()
@Resolver(of => Sample)
export default class SampleResolver {
  @App()
  app: IMidwayKoaApplication;

  @Query(returns => Sample)
  async GetSample(@Ctx() context: IContext): Promise<Sample> {
    return {
      sampleId: 0,
      uuidProp: uuidv4(),
    };
  }
}
