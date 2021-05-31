import { IsInt, IsPositive, IsString, Length } from 'class-validator';
import { Field, ID, InputType, Int, InterfaceType } from 'type-graphql';

@InterfaceType()
export abstract class IProfile {
  @Field(type => ID)
  profileId: number;

  @Field()
  description: string;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(type => Date)
  createDate!: Date;

  @Field(type => Date)
  updateDate!: Date;
}

@InputType()
export class UpdateProfileInput {
  @Field(type => Int)
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @Length(2, 10)
  description: string;
}

@InputType()
export class DeleteProfileInput {
  @Field(type => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
