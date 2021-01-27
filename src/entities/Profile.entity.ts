import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import User from './User.entity';

import { IProfile } from '../graphql/profile.type';
import { ObjectType } from 'type-graphql';

@ObjectType({ implements: IProfile })
@EntityModel()
export default class Profile extends BaseEntity implements IProfile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column()
  description: string;

  @OneToOne(type => User, user => user.profile, {
    onDelete: 'SET NULL',
  })
  user: User;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
