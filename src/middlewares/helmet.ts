import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

import helmet from 'koa-helmet';

@Provide('HelmetMiddleware')
export default class HelmetMiddleware implements IWebMiddleware {
  resolve() {
    return helmet({
      // Apollo-Servr GraphQL Playground Policy
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production'
          ? {
              directives: {
                defaultSrc: [`'self'`],
                styleSrc: [
                  `'self'`,
                  `'unsafe-inline'`,
                  'cdn.jsdelivr.net',
                  'fonts.googleapis.com',
                ],
                fontSrc: [`'self'`, 'fonts.gstatic.com'],
                imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
                scriptSrc: [
                  `'self'`,
                  `https: 'unsafe-inline'`,
                  `cdn.jsdelivr.net`,
                ],
              },
            }
          : undefined,
    });
  }
}
