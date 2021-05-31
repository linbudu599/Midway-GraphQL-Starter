import { EntityModel } from '@midwayjs/orm';
import { ObjectType } from 'type-graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';

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
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  profile?: Profile;

  @RelationId((user: User) => user.profile)
  profileId?: number;

  @OneToMany(type => Post, post => post.author, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  posts?: Post[];

  @RelationId((user: User) => user.posts)
  postsIds: number[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
