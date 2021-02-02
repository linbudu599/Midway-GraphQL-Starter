import { Aspect, IMethodAspect, JoinPoint, Provide } from '@midwayjs/decorator';
import { IMidwayWebContext, IMidwayWebNext } from '@midwayjs/web';
import { HomeController } from '../controller/home';

// https://www.yuque.com/midwayjs/midway_v2/aspect

@Provide()
@Aspect([HomeController])
export class ReportInfo implements IMethodAspect {
  async before(point: JoinPoint) {
    const { methodName, target, args, proceed } = point;
    const [ctx, next] = args as [IMidwayWebContext, IMidwayWebNext];
    console.log(
      `${ctx.method.toLocaleUpperCase()} ${ctx.path} is handle by ${methodName}`
    );
  }
  async around(joinPoint: JoinPoint) {}

  async afterReturn(joinPoint: JoinPoint, result: any) {}
  async afterThrow(joinPoint: JoinPoint, error: Error) {}
  async after(point: JoinPoint, result: any, error: Error) {}
}
