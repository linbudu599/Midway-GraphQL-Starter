import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/koa';

import logger from 'koa-logger';

@Provide('LoggerMiddleware')
export default class LoggerMiddleware implements IWebMiddleware {
  resolve() {
    return logger();
  }
}
