import { Init, Provide } from '@midwayjs/decorator';
import { InjectEntityModel, InjectEntityManager } from '../lib/orm';
import { Repository, EntityManager, SelectQueryBuilder } from 'typeorm';

import User from '../entities/User.entity';
import { CreateUserInput, UpdateUserInput } from '../dto/user.dto';

@Provide()
export class UserService {
  userQueryBuilder: SelectQueryBuilder<User>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityManager()
  entityManager: EntityManager;

  @Init()
  async initialize(): Promise<void> {
    // you can also use params to create QueryBuilder with(or without) relations
    this.userQueryBuilder = this.userModel
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .leftJoinAndSelect('user.profile', 'profile');
  }

  async getAllUsers(offset: number, take: number): Promise<User[]> {
    // works as same
    // return await this.userModel.find({
    //   skip: offset,
    //   take,
    //   relations: ['posts', 'profile'],
    // });
    return await this.userQueryBuilder.offset(offset).take(take).getMany();
  }

  async getUserById(id: number): Promise<User> {
    return await this.userModel.findOne(id);
  }

  async createUser(user: CreateUserInput): Promise<User> {
    return await this.userModel.save(user);
  }

  async updateUser(user: UpdateUserInput): Promise<User> {
    await this.userModel.update(user.id, user);
    return await this.getUserById(user.id);
  }

  async deleteUser(id: number) {
    return await this.userModel.delete(id);
  }
}
