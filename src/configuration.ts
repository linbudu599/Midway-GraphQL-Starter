import { Configuration, App } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import { getConnection } from 'typeorm';

import { getMockUser } from './utils/mock';
import { defaultPagination } from './utils/constants';
import { infoLog } from './utils/helper';

import User from './entities/User.entity';
import Profile from './entities/Profile.entity';
import Post from './entities/Post.entity';

@Configuration({
  imports: ['@midwayjs/orm'],
  importConfigs: ['./config'],
})
export class ContainerConfiguration implements ILifeCycle {
  @App()
  app: IMidwayKoaApplication;

  async onReady() {
    this.app.use(await this.app.generateMiddleware('GraphQLMiddleware'));

    this.app.getApplicationContext().registerObject('mockUser', getMockUser());
    this.app
      .getApplicationContext()
      .registerObject('pagination', defaultPagination);

    const connection = getConnection();

    infoLog(`[ TypeORM ] connection [${connection.name}] established`);

    const mockUser1 = new User();

    const mockProfile1 = new Profile();
    mockProfile1.description = 'A Coder';

    const mockPost1 = new Post();
    mockPost1.title = 'The Power of MidwayJS';

    mockUser1.name = '张三';
    mockUser1.profile = mockProfile1;
    mockUser1.posts = [mockPost1];

    await mockUser1.save();

    infoLog('[ TypeORM ] Mock Data Inserted');
  }
}
