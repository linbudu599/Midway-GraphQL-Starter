import { Field, ID, InputType, Int, InterfaceType } from 'type-graphql';

import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { IProfile } from './profile.type';
import { IPost } from './post.type';

@InterfaceType()
export abstract class IUser {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(type => IProfile, { nullable: true })
  profile?: IProfile;

  @Field(() => Int, { nullable: true })
  profileId?: number;

  @Field(type => [IPost]!, { nullable: true })
  posts?: IPost[];

  @Field(() => [Int], { nullable: true })
  postsIds?: number[];

  @Field(type => Date)
  createDate: Date;

  @Field(type => Date)
  updateDate: Date;
}

@InputType()
export class UserCreateInput {
  @Field()
  @IsString()
  @Length(2, 10)
  name: string;
}

@InputType()
export class UserUpdateInput {
  @IsNumber()
  @IsPositive()
  @Field(type => Int)
  id: number;

  @Field()
  @IsString()
  @Length(2, 30)
  @IsOptional()
  name?: string;
}

@InputType()
export class UserPaginationInput {
  @Field(type => Int)
  @IsInt()
  @IsOptional()
  @Min(0)
  offset?: number;

  @Field(type => Int)
  @IsInt()
  @IsOptional()
  @Min(5)
  @Max(100)
  take?: number;
}
