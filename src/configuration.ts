import path from 'path';
import { Configuration, App } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { getConnection } from 'typeorm';

import dotenv from 'dotenv';

import { createMockUserData } from './utils/mock';
import { defaultPagination } from './utils/constants';
import { infoLog } from './utils/helper';

import { PrismaClient } from './prisma/client';

dotenv.config({
  path: ['development', 'local'].includes(process.env.NODE_ENV)
    ? path.resolve(process.cwd(), '.env.dev')
    : path.resolve(process.cwd(), '.env.prod'),
});

const client = new PrismaClient();

@Configuration({
  imports: ['./lib/orm'],
  importConfigs: ['./config'],
})
export class ContainerConfiguration implements ILifeCycle {
  @App()
  app: IMidwayKoaApplication;

  async onReady(): Promise<void> {
    // setup prisma connection and inject into Midway runtime container
    client.$connect();
    this.app.getApplicationContext().registerObject('prisma', client);

    // Prisma Mock Data Seeding
    await client.prismaSampleModel.create({
      data: {
        version: 2,
      },
    });

    this.app.use(await this.app.generateMiddleware('ResolveTimeMiddleware'));
    this.app.use(await this.app.generateMiddleware('GraphQLMiddleware'));
    // this.app.use(await this.app.generateMiddleware('HelmetMiddleware'));
    this.app.use(await this.app.generateMiddleware('CompressMiddleware'));
    this.app.use(await this.app.generateMiddleware('CORSMiddleware'));
    // this.app.use(await this.app.generateMiddleware('JSONPrettierMiddleware'));
    // this.app.use(await this.app.generateMiddleware('RateLimitMiddleware'));
    // this.app.use(await this.app.generateMiddleware('StaticMiddleware'));

    // Inject Shared Application Data Here
    this.app
      .getApplicationContext()
      .registerObject('pagination', defaultPagination);

    // TypeORM Mock Data Seeding
    const connection = getConnection();

    infoLog(`[ TypeORM ] connection [${connection.name}] established`);
    await createMockUserData();
    infoLog('[ TypeORM ] Mock Data Inserted');
  }

  async onStop(): Promise<void> {
    client.$disconnect();
  }
}
