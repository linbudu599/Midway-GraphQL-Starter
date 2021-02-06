import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/koa';

import json from 'koa-json';

@Provide('JSONPrettierMiddleware')
export default class JSONPrettierMiddleware implements IWebMiddleware {
  resolve() {
    return json({ pretty: true, param: 'pretty' });
  }
}
