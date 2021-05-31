import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

import Profile from '../entities/Profile.entity';

@Provide()
export class ProfileService {
  @InjectEntityModel(Profile)
  profileModel: Repository<Profile>;

  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileModel.find({
      relations: ['user'],
    });
  }

  async getProfileById(id: number) {
    return await this.profileModel.findOne(id, { relations: ['user'] });
  }

  async createProfile(description: string): Promise<Profile> {
    return await this.profileModel.save({
      description,
    });
  }

  async updateProfile(id: number, description: string) {
    await this.profileModel.update(id, { description });
    return await this.getProfileById(id);
  }

  async deleteProfile(id: number) {
    return await this.profileModel.delete(id);
  }
}
