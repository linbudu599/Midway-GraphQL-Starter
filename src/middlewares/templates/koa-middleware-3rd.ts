import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/koa';
import ThirdPartyLib from 'ThirdPartyLib';

@Provide('middlewareName')
export default class PlaceholderMiddleware implements IWebMiddleware {
  resolve() {
    return ThirdPartyLib();
  }
}
