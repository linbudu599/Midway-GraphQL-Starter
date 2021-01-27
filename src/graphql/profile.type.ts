import {
  Field,
  ID,
  ObjectType,
  InputType,
  Int,
  InterfaceType,
} from 'type-graphql';

@InterfaceType()
export abstract class IProfile {
  @Field(type => ID)
  profileId: number;

  @Field()
  description: string;

  @Field(type => Date)
  createDate!: Date;

  @Field(type => Date)
  updateDate!: Date;
}
