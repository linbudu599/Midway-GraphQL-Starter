import { Provide, Inject, App } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import {
  Resolver,
  Query,
  Authorized,
  Arg,
  Int,
  Mutation,
  Ctx,
} from 'type-graphql';
import { DeleteResult, Repository } from 'typeorm';

import User from '../entities/User.entity';
import { UserService } from '../services/user.service';

import {
  UserCreateInput,
  UserUpdateInput,
  UserPaginationInput,
} from '../graphql/user.type';

import { UserRole, IDefaultPagination } from '../utils/constants';
import { IContext } from '../typing';
import { PrismaClient } from '../prisma/client';

@Provide()
@Resolver(of => User)
export default class UserResolver {
  @App()
  app: IMidwayKoaApplication;

  @Inject()
  mockUser: User[];

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  pagination: IDefaultPagination;

  @Inject()
  userService: UserService;

  // In GraphQL Resolver, you can get prisma client instance by directly inject(@Inject)
  // or inject to ApolloServer context, then get client @Ctx()
  @Inject('prisma')
  prisma: PrismaClient;

  @Authorized(UserRole.ADMIN)
  @Query(returns => [User])
  async GetAllUsers(
    @Arg('pagination', type => UserPaginationInput, { nullable: true })
    pagination: UserPaginationInput,

    @Ctx() context: IContext
  ): Promise<User[]> {
    const { offset, take } = pagination ?? this.pagination;
    console.log(context.container === this.app.getApplicationContext()); // true
    return await this.userService.getAllUsers(offset, take);
  }

  @Query(returns => User, { nullable: true })
  async GetUserById(@Arg('id', type => Int) id: number): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Mutation(returns => User, { nullable: true })
  async CreateUser(
    @Arg('createParams', type => UserCreateInput) createParams: UserCreateInput
  ) {
    return await this.userService.createUser(createParams);
  }

  @Mutation(returns => User, { nullable: true })
  async UpdateUser(
    @Arg('updateParams', type => UserUpdateInput) updateParams: UserUpdateInput
  ): Promise<User> {
    return await this.UpdateUser(updateParams);
  }
}
