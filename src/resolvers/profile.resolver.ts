import { Provide, Inject, App } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import { Resolver, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';

import Profile from '../entities/Profile.entity';
import { ProfileService } from '../services/profile.service';

import { ProfileUpdateInput } from '../graphql/profile.type';
import { IContext } from '../typing';

@Provide()
@Resolver(of => Profile)
export default class ProfileResolver {
  @App()
  app: IMidwayKoaApplication;

  @InjectEntityModel(Profile)
  profileModel: Repository<Profile>;

  @Inject()
  profileService: ProfileService;

  @Query(returns => [Profile])
  async GetAllProfiles(@Ctx() context: IContext): Promise<Profile[]> {
    return await this.profileService.getAllProfiles();
  }

  @Query(returns => Profile)
  async GetProfileById(@Arg('id', type => Int) id: number) {
    return await this.profileService.getProfileById(id);
  }

  @Mutation(returns => Profile)
  async CreateProfile(
    @Arg('description')
    description: string
  ) {
    return await this.profileService.createProfile(description);
  }

  @Mutation(returns => Profile)
  async UpdateProfile(
    @Arg('updateParams', type => ProfileUpdateInput)
    { id, description }: ProfileUpdateInput
  ) {
    return await this.profileService.updateProfile(id, description);
  }

  @Mutation(returns => Profile)
  async DeleteProfile(
    @Arg('id', type => Int)
    id: number
  ) {
    return await this.profileService.deleteProfile(id);
  }
}
