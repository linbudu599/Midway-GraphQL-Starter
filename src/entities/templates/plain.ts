import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@EntityModel()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // selfRelation OneToOne
  @OneToOne(() => User, (user: User) => user.lover)
  @JoinColumn()
  lover: User;

  // as a leader, you got many subordinates
  // selfRelation ManyToOne
  @ManyToOne(() => User, (self: User) => self.subordinates)
  leader: User;

  // as a subordinates, many of you got a leader
  // selfRelation OneToMany
  // use @Many
  @OneToMany(() => User, (subordinate: User) => subordinate.leader)
  subordinates: User[];

  // selfRelationManyToMany
  @ManyToMany(() => User, (colleague: User) => colleague.colleagues)
  colleagues: User[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
