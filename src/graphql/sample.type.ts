import {
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  Directive,
  ObjectType,
} from 'type-graphql';

import { UUIDScalar } from '../scalars/UUID';

// This ObjectType is for displaying usages of:
// scalars
// directives
// field resolvers
// ...

@ObjectType()
export class Sample {
  @Field(type => ID)
  sampleId: number;

  @Field(type => UUIDScalar)
  uuidProp: string;
}
