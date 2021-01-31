import {
  Provide,
  Inject,
  Controller,
  Get,
  Param,
  Post,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import { ProfileService } from '../services/profile.service';
import { UpdateProfileInput, DeleteProfileInput } from '../dto/profile.dto';

@Provide()
@Controller('/api')
export class ProfileAPIController {
  @Inject()
  ctx: Context;

  @Inject()
  profileService: ProfileService;

  @Get('/profile/:id')
  async getProfileById(@Param() id: number) {
    const profile = await this.profileService.getProfileById(id);
    return { success: true, message: 'OK', data: profile };
  }

  @Post('/profile/update')
  async updateProfile(@Body(ALL) { id, description }: UpdateProfileInput) {
    const updateResult = await this.profileService.updateProfile(
      id,
      description
    );
    return { success: true, message: 'OK', data: updateResult };
  }

  @Post('/profile/delete')
  async deleteProfile(@Body(ALL) { id }: DeleteProfileInput) {
    const deleteResult = await this.profileService.deleteProfile(id);
    return { success: true, message: 'OK', data: deleteResult };
  }
}
