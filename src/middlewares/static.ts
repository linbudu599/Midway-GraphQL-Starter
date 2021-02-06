import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/koa';

import serve from 'koa-static';

@Provide('StaticMiddleware')
export default class StaticMiddleware implements IWebMiddleware {
  resolve() {
    return serve('.', {
      gzip: true,
    });
  }
}
