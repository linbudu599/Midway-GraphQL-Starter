import {
  Field,
  ID,
  ObjectType,
  InputType,
  Int,
  InterfaceType,
  Directive,
} from 'type-graphql';

import { IUser } from './user.type';

@InterfaceType()
export abstract class IPost {
  @Field(type => ID)
  postId: number;

  @Field()
  title: string;

  @Directive('@capitalize')
  @Field()
  content: string;

  @Field(type => IUser, { nullable: true })
  author: IUser;

  @Field(() => Int, { nullable: true })
  authorId?: number;

  @Field(type => Date)
  createDate!: Date;

  @Field(type => Date)
  updateDate!: Date;
}
