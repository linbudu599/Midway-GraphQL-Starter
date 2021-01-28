import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide('SpecificMiddleware')
export default class SpecificMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      console.log(
        `This Middleware only Invoke on specific router: ${ctx.method.toLocaleUpperCase()} ${
          ctx.url
        }`
      );
      await next();
    };
  }
}
