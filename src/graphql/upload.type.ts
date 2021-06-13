import {
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  Directive,
  ObjectType,
} from 'type-graphql';

@ObjectType()
export class Upload {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;
}
