import { Field, ID, ObjectType } from 'type-graphql';
import { EntityModel } from '@midwayjs/orm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@EntityModel()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
