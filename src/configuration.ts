import { Configuration, App } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { getConnection } from 'typeorm';

import dotenv from 'dotenv';

import { createMockUserData } from './utils/mock';
import { defaultPagination } from './utils/constants';
import { infoLog } from './utils/helper';

import User from './entities/User.entity';
import Profile from './entities/Profile.entity';
import Post from './entities/Post.entity';

import { PrismaClient } from './prisma/client';

// Prisma require env variables
dotenv.config();

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

    this.app.use(await this.app.generateMiddleware('ResolveTimeMiddleware'));
    this.app.use(await this.app.generateMiddleware('GraphQLMiddleware'));
    this.app.use(await this.app.generateMiddleware('HelmetMiddleware'));
    this.app.use(await this.app.generateMiddleware('CompressMiddleware'));
    this.app.use(await this.app.generateMiddleware('CORSMiddleware'));
    this.app.use(await this.app.generateMiddleware('JSONPrettierMiddleware'));
    this.app.use(await this.app.generateMiddleware('RateLimitMiddleware'));
    this.app.use(await this.app.generateMiddleware('StaticMiddleware'));

    this.app
      .getApplicationContext()
      .registerObject('pagination', defaultPagination);

    const connection = getConnection();

    infoLog(`[ TypeORM ] connection [${connection.name}] established`);

    await createMockUserData();

    infoLog('[ TypeORM ] Mock Data Inserted');
  }

  async onStop(): Promise<void> {
    client.$disconnect();
  }
}
