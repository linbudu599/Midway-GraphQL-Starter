import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide('ResolveTimeMiddleware')
export class ResolveTimeMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      const startTime = Date.now();
      await next();
      console.log(
        `REST Resolve Time on ${ctx.path} : ${Date.now() - startTime} ms`
      );
    };
  }
}
