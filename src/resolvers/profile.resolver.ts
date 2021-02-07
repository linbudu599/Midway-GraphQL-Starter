import { Provide, Inject, App } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { Repository } from 'typeorm';

import User from '../entities/User.entity';
import Profile from '../entities/Profile.entity';
import { ProfileService } from '../services/profile.service';

import {
  UpdateProfileInput,
  DeleteProfileInput,
} from '../graphql/profile.type';

@Provide()
@Resolver(of => User)
export default class UserResolver {
  @App()
  app: IMidwayKoaApplication;

  @InjectEntityModel(Profile)
  profileModel: Repository<Profile>;

  @Inject()
  profileService: ProfileService;

  @Query(returns => Profile)
  async GetProfileById(@Arg('id', type => Int) id: number) {
    return await this.profileService.getProfileById(id);
  }

  @Mutation(returns => Profile)
  async UpdateProfile(
    @Arg('updateParams', type => UpdateProfileInput)
    { id, description }: UpdateProfileInput
  ) {
    return await this.profileService.updateProfile(id, description);
  }
}
