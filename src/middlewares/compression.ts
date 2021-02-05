import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

import compress from 'koa-compress';

@Provide('CompressMiddleware')
export default class CompressMiddleware implements IWebMiddleware {
  resolve() {
    return compress();
  }
}
