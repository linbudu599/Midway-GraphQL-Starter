 path  'path';
 { Configuration, App }  '@midwayjs/decorator';
 { ILifeCycle }  '@midwayjs/core';
 { IMidwayKoaApplication }  '@midwayjs/koa';
 { getConnection }  'typeorm';

 dotenv  'dotenv';

 { createMockUserData }  './utils/mock';
 { defaultPagination }  './utils/constants';
 { infoLog }  './utils/helper';

// eslint-disable-next-line node/no-unpublished-import
 { PrismaClient }  './prisma/client';

 *  orm  '@midwayjs/orm';

dotenv.config({
  path: ['development', 'local'].includes(process.env.NODE_ENV)
    ? path.resolve(process.cwd(), '.env')
    : path.resolve(process.cwd(), '.env.prod'),
});

 client = PrismaClient();

({
  imports: [orm],
  importConfigs: ['./config'],
})
  ContainerConfiguration implements ILifeCycle {
  ()
  app: IMidwayKoaApplication;

   onReady(): Promisevoid {
    // setup prisma connection inject Midway runtime container
    client.$connect();
    this.app.getApplicationContext().registerObject('prisma', client);

    // Prisma Mock Data Seeding
     client.prismaSampleModel.create({
       {
        version: 2,
      },
    });

    this.app.use(await this.app.generateMiddleware('ResolveTimeMiddleware'));
    this.app.use(await this.app.generateMiddleware('GraphQLMiddleware'));
    // this.app.use(await this.app.generateMiddleware('HelmetMiddleware'));
    this.app.use(await this.app.generateMiddleware('CompressMiddleware'));
    this.app.use(await this.app.generateMiddleware('CORSMiddleware'));
    this.app.use(await this.app.generateMiddleware('JSONPrettierMiddleware'));
    // this.app.use(await this.app.generateMiddleware('RateLimitMiddleware'));
    this.app.use(await this.app.generateMiddleware('StaticMiddleware'));

    // Inject Shared Application Here
    this.app
      .getApplicationContext()
      .registerObject('pagination', defaultPagination);

    // TypeORM Mock Data Seeding
     connection = getConnection();

    infoLog(`[ TypeORM ] connection [${connection.name}] established`);
     createMockUserData();
    infoLog('[ TypeORM ] Mock Data Inserted');
  }

   onStop(): Promisevoid {
    client.$disconnect();
  }
}
