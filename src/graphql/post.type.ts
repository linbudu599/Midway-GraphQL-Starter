import {
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  Directive,
} from 'type-graphql';
import { IsInt, IsString } from 'class-validator';

import { IUser } from './user.type';

@InterfaceType()
export abstract class IPost {
  @Field(type => ID)
  postId: number;

  @Field()
  title: string;

  @Directive('@capitalize')
  @Field({ nullable: true })
  content?: string;

  @Field(type => IUser, { nullable: true })
  author?: IUser;

  @Field(() => Int, { nullable: true })
  authorId?: number;

  @Field(type => Date)
  createDate!: Date;

  @Field(type => Date)
  updateDate!: Date;
}

@InputType()
export class PostCreateInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  content?: string;

  @Field()
  @IsInt()
  authorId: number;
}

@InputType()
export class PostUpdateInput {
  @Field()
  @IsInt()
  postId: number;

  @Field({ nullable: true })
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  content?: string;
}
