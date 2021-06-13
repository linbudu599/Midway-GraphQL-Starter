import { EntityModel } from '@midwayjs/orm';
import { ObjectType } from 'type-graphql';
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

  @ManyToOne(() => User, user => user.id, {
    onDelete: 'SET NULL',
  })
  @TypeormLoader()
  author: User;

  @RelationId((post: Post) => post.author)
  authorId?: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
