import { Provide, Inject, App } from '@midwayjs/decorator';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { Resolver, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';

import { Sample } from '../graphql/sample.type';
import { IContext } from '../typing';

import { v4 as uuidv4 } from 'uuid';

import { UUIDScalar } from '../scalars/UUID';
import { DateScalar } from '../scalars/Date';

@Provide()
@Resolver(of => Sample)
export default class SampleResolver {
  @App()
  app: IMidwayKoaApplication;

  @Query(returns => Sample)
  async UUIDScalarQuery(
    @Arg('uuid', type => UUIDScalar, { nullable: true }) uuid: string,
    @Arg('date', type => DateScalar, { nullable: true }) date: number
  ) {
    console.log('uuid: ', uuid);
    console.log('date: ', date);
    return {
      sampleId: 0,
      uuidProp: uuidv4(),
      dateProp: new Date(),
    };
  }
}
