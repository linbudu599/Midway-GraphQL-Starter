import { Rule, RuleType } from '@midwayjs/decorator';

export class UpdateProfileInput {
  @Rule(RuleType.number().required().positive())
  id: number;

  @Rule(RuleType.string().required().min(2).max(20))
  description: string;
}

export class DeleteProfileInput {
  @Rule(RuleType.number().required().positive())
  id: number;
}
