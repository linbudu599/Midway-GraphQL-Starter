import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User.entity';

import { IPost } from '../graphql/post.type';

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

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
