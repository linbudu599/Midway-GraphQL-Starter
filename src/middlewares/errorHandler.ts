import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide('UnAuthorizedHandlerMiddleware')
export class UnAuthorizedHandlerMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      try {
        const res = await next();
        console.log(res);
      } catch (error) {
        if (error.status === 401) {
          ctx.body = 'Resource Protected';
        } else {
          throw error;
        }
      }
    };
  }
}
