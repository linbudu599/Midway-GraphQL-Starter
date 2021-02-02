import { Controller, Get, Provide, Query, ALL } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {
  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }

  @Get('/x')
  async another(@Query(ALL) queries: Record<string, unknown>) {
    return 'Hello Midwayjs!';
  }
}
