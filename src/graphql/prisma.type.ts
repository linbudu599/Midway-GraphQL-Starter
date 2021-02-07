import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class PrismaSample {
  @Field(type => ID)
  id!: number;

  @Field()
  version!: string;

  @Field(type => Date)
  createdAt!: Date;
}
