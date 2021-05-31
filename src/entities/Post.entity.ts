import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';

import User from './User.entity';

import { IPost } from '../graphql/post.type';
import { ObjectType } from 'type-graphql';

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
  author: User;

  @RelationId((post: Post) => post.author)
  authorId?: number;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
