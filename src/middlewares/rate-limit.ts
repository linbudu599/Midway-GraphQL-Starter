import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/koa';

import ratelimit from 'koa-ratelimit';

const db = new Map();

@Provide('RateLimitMiddleware')
export default class RateLimitMiddleware implements IWebMiddleware {
  resolve() {
    return ratelimit({
      driver: 'memory',
      db: db,
      duration: 60000,
      errorMessage: 'Sometimes You Just Have to Slow Down.',
      id: ctx => ctx.ip,
      headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total',
      },

      max: 100,
      disableHeader: false,
      whitelist: ctx => {
        // some logic that returns a boolean
        return true;
      },
      blacklist: ctx => {
        // some logic that returns a boolean
        return true;
      },
    });
  }
}
