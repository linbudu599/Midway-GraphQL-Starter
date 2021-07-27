import { Provide } from '@midwayjs/decorator';
import { IMidwayExpressContext, IWebMiddleware } from '@midwayjs/express';
import { NextFunction } from 'express';
import ThirdPartyLib from 'ThirdPartyLib';

@Provide('middlewareName')
export default class PlaceholderMiddleware implements IWebMiddleware {
  resolve() {
    return ThirdPartyLib();
  }
}
