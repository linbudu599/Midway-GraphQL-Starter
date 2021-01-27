import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType } from 'type-graphql';

import Profile from './Profile.entity';
import Post from './Post.entity';

import { IUser } from '../graphql/user.type';

@ObjectType({ implements: IUser })
@EntityModel()
export default class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Profile, profile => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Post, post => post.author, {
    cascade: true,
  })
  posts: Post[];

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
