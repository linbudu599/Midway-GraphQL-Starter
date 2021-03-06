import { EntityModel } from '@midwayjs/orm';
import { ObjectType, Field } from 'type-graphql';
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
import { TypeormLoader } from 'type-graphql-dataloader';

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

  // @Field(() => Profile)
  @OneToOne(type => Profile, profile => profile.user, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: ['insert'],
  })
  @JoinColumn()
  @TypeormLoader(() => Profile, (user: User) => user.profile)
  profile?: Profile;

  @RelationId((user: User) => user.profile)
  profileId?: number;

  // @Field(() => [Post])
  @OneToMany(type => Post, post => post.author, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: ['insert'],
  })
  @TypeormLoader(() => Post, (user: User) => user.posts)
  posts?: Post[];

  @RelationId((user: User) => user.posts)
  postsIds: number[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
