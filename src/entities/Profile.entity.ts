import { EntityModel } from '@midwayjs/orm';
import { ObjectType, Field } from 'type-graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  RelationId,
} from 'typeorm';
import { TypeormLoader } from 'type-graphql-dataloader';

import User from './User.entity';

import { IProfile } from '../graphql/profile.type';

@ObjectType({ implements: IProfile })
@EntityModel()
export default class Profile extends BaseEntity implements IProfile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column()
  description: string;

  @OneToOne(type => User, user => user.profile, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: ['insert'],
  })
  @TypeormLoader(() => User, (profile: Profile) => profile.user)
  user: User;

  @RelationId((profile: Profile) => profile.user)
  userId: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
