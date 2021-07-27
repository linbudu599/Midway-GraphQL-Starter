import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide('middlewareName')
export default class PlaceholderMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {};
  }
}
