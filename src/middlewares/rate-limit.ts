import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/express';

import RateLimit from 'express-rate-limit';

@Provide('RateLimitMiddleware')
export default class RateLimitMiddleware implements IWebMiddleware {
  resolve() {
    return RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    });
  }
}
