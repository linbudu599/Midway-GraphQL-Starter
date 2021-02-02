import { MiddlewareFn } from 'type-graphql';
import User from '../entities/User.entity';

// intercept exeuction result
const InterceptorOnUserEntityRequest = (
  userNameContaines: string
): MiddlewareFn => async ({ root }, next) => {
  const res: User[] = await next();

  if (!Array.isArray(res)) {
    return res;
  }

  const notAllowedUserNameReq = (user: User) =>
    user.name.includes(userNameContaines);

  const shouldInterceptorInvoke = res.some(notAllowedUserNameReq);

  if (shouldInterceptorInvoke) {
    res.forEach(user => {
      if (notAllowedUserNameReq(user)) {
        console.log('Interceptor Invoke!');
        user.name = 'PRIVATE_USER_NAME';
      }
    });
  }

  return res;
};

export const InterceptorOnSpecificUser: MiddlewareFn = InterceptorOnUserEntityRequest(
  '张三'
);
