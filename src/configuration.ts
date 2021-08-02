import path from 'path';
import { Configuration, App } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { getConnection } from 'typeorm';

import dotenv from 'dotenv';
import open from 'open';
import { openBrowser } from './lib/open-browser';

import { createMockUserData } from './utils/mock';
import { defaultPagination } from './utils/constants';
import { infoLog } from './utils/helper';

import { PrismaClient } from './prisma/client';

import * as orm from '@midwayjs/orm';

const envFilesPath = ['development', 'local'].includes(process.env.NODE_ENV)
  ? path.resolve(process.cwd(), '.env')
  : path.resolve(process.cwd(), '.env.prod');

dotenv.config({
  path: envFilesPath,
});

infoLog(`[ App ] Loading env file from ${envFilesPath}`);

const client = new PrismaClient();

@Configuration({
  imports: [orm],
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
    // this.app.use(await this.app.generateMiddleware('CompressMiddleware'));
    this.app.use(await this.app.generateMiddleware('CORSMiddleware'));
    // this.app.use(await this.app.generateMiddleware('JSONPrettierMiddleware'));
    // this.app.use(await this.app.generateMiddleware('RateLimitMiddleware'));
    this.app.use(await this.app.generateMiddleware('StaticMiddleware'));

    // Inject Shared Application Data Here
    this.app
      .getApplicationContext()
      .registerObject('pagination', defaultPagination);

    // TypeORM Mock Data Seeding
    const connection = getConnection();
    console.log(
      'connection: ',
      connection.entityMetadatas.map(e => e.name)
    );

    console.log(connection.options);

    infoLog(`[ TypeORM ] connection [${connection.name}] established`);
    await createMockUserData();
    infoLog('[ TypeORM ] Mock Data Inserted');

    // FIXME: Use non hard-coded URL
    // FIXME: Avtive existed tab instead of opening another one
    // openBrowser('http://127.0.0.1:7001/graphql');
  }

  async onStop(): Promise<void> {
    client.$disconnect();
  }
}
