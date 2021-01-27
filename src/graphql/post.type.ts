import {
  Field,
  ID,
  ObjectType,
  InputType,
  Int,
  InterfaceType,
} from 'type-graphql';

@InterfaceType()
export abstract class IPost {
  @Field(type => ID)
  postId: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(type => Date)
  createDate!: Date;

  @Field(type => Date)
  updateDate!: Date;
}
