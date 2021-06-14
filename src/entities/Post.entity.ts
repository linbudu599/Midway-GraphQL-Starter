import { EntityModel } from '@midwayjs/orm';
import { ObjectType, Field } from 'type-graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';
import { TypeormLoader } from 'type-graphql-dataloader';

import User from './User.entity';

import { IPost } from '../graphql/post.type';

@ObjectType({ implements: IPost })
@EntityModel()
export default class Post extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  // @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.posts, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: ['insert'],
  })
  @TypeormLoader(() => User, (post: Post) => post.author)
  author: User;

  @RelationId((post: Post) => post.author)
  authorId: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
