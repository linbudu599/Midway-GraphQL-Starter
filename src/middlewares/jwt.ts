import { Config, Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

import jwt from 'koa-jwt';

import { IJWTConfig } from '../typing';

@Provide('KoaJWTMiddleware')
export class KoaJWTMiddleware implements IWebMiddleware {
  @Config('jwt')
  config: IJWTConfig;

  resolve() {
    const { secretKey, passthrough = false, excludePath = null } = this.config;
    let jwtBase = jwt({
      secret: secretKey,
      passthrough,
      getToken: (ctx, opts) => {
        console.log('ctx.headers.token', ctx.headers['token']);
        return ctx.headers['token'];
      },
    });

    if (excludePath) {
      jwtBase.unless({ path: excludePath });
    }

    return jwtBase;
  }
}
