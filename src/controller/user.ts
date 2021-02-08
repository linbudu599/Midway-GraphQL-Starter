import {
  Provide,
  Inject,
  Controller,
  Get,
  Post,
  All,
  Query,
  Param,
  Body,
  ALL,
  Validate,
  Config,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { ValidationError } from 'joi';
import jwt from 'jsonwebtoken';

import { UserService } from '../services/user.service';
import {
  CreateUserInput,
  UpdateUserInput,
  UserPaginationInput,
} from '../dto/user.dto';
import { IJWTConfig } from '../typing';

@Provide()
@Controller('/api')
export class UserAPIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Config('jwt')
  jwtConfig: IJWTConfig;

  @Get('/token')
  async dispatchToken() {
    const token = jwt.sign(
      {
        user: '林不渡',
      },
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoi5p6X5LiN5rihIiwiaWF0IjoxNjEyNzY3NzQ3LCJleHAiOjE2MTMzNzI1NDd9.geYEU8O9kc9NeuANJGLuTcdgrS-NOlnLF7eAQ4riklc
      this.jwtConfig.secretKey,
      { expiresIn: '7d' }
    );
    return { success: true, message: 'OK', token: token };
  }

  @Get('/401')
  async UnAuthorized() {
    // this.ctx.throw(401);
    this.ctx.status = 401;
    return { success: false, code: 401 };
  }

  @Get('/users', { middleware: ['SpecificMiddleware'] })
  async getAllUser(@Query(ALL) pagination: UserPaginationInput) {
    const { offset = 0, take = 10 } = pagination;
    const users = await this.userService.getAllUsers(offset, take);
    return { success: true, message: 'OK', data: users };
  }

  @Get('/user/:id')
  async getUserById(@Param() id: number) {
    const user = await this.userService.getUserById(id);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/user/create')
  @Validate()
  async createUser(@Body(ALL) createParam: CreateUserInput) {
    try {
      const user = await this.userService.createUser(createParam);
      return { success: true, message: 'OK', data: user };
    } catch (error) {
      if (error instanceof ValidationError) {
        return { success: false, message: 'Params Validation Error', data: {} };
      } else {
        return { success: false, message: 'Unknown Errors', data: {} };
      }
    }
  }

  @Post('/user/update')
  @Validate()
  async updateUser(@Body(ALL) updateParam: UpdateUserInput) {
    try {
      const user = await this.userService.updateUser(updateParam);
      return { success: true, message: 'OK', data: user };
    } catch (error) {
      if (error instanceof ValidationError) {
        return { success: false, message: 'Params Validation Error', data: {} };
      } else {
        return { success: false, message: 'Unknown Errors', data: {} };
      }
    }
  }

  @Post('/user/delete')
  async deleteUser(@Body() id: number) {
    const user = await this.userService.deleteUser(id);
    return { success: true, message: 'OK', data: user };
  }
}
