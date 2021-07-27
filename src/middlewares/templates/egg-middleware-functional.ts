import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

export const Middleware = () => {
  return async function (ctx: Context, next: IMidwayWebNext) {};
};
