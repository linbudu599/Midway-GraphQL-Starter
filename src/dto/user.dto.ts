import { Rule, RuleType } from '@midwayjs/decorator';
import {
  IsString,
  IsOptional,
  IsInt,
  Length,
  Min,
  Max,
  IsPositive,
} from 'class-validator';

// Validate By Joi

export class CreateUserInput {
  @Rule(RuleType.string().required().min(2).max(10))
  name: string;
}

export class UpdateUserInput {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required().min(2).max(10))
  name: string;
}

export class UserPaginationInput {
  @Rule(RuleType.number().optional().default(0).min(0))
  offset?: number;

  @Rule(RuleType.number().optional().default(100).min(1).max(200))
  take?: number;
}

// Validate By Class-Validator

export class CreateUserValidation {
  @IsString()
  @Length(2, 10)
  name: string;
}

export class UpdateUserValidation {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsOptional()
  @Length(2, 10)
  name?: string;
}

export class PaginationValidation {
  @IsInt()
  @Min(0)
  @Max(200)
  @IsOptional()
  offset?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  take?: number;
}
