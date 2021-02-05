import { MiddlewareFn } from 'type-graphql';
import User from '../entities/User.entity';

// intercept exeuction result
const InterceptorOnUserEntityRequest = (
  userNameContains: string
): MiddlewareFn => async ({ root, args, context, info }, next) => {
  let res: string | User[] = await next();

  console.log('info ' + info.fieldName + '  ' + info.parentType.name);
  console.log('res ' + res);

  // Interceptor at final execution
  // when resolver got here, res is "张三"(basic scalar type will be executed at last)
  // if (
  //   info.fieldName === 'name' &&
  //   info.parentType.name === 'User' &&
  //   typeof res === 'string'
  // ) {
  //   // you should use match or test method
  //   if (res === userNameContains) {
  //     res = 'PRIVATE_USER_NAME';
  //   }
  //   return res;
  // }

  // Interceptor at specific Resolver + Field
  // (Root Query)
  // if (
  //   info.fieldName === 'GetAllUsers' &&
  //   info.parentType.name === 'Query' &&
  //   Array.isArray(res)
  // ) {
  //   const notAllowedUserNameReq = (user: User) =>
  //     user.name.includes(userNameContains);

  //   const shouldInterceptorInvoke = res.some(notAllowedUserNameReq);
  //   if (shouldInterceptorInvoke) {
  //     res.forEach(user => {
  //       if (notAllowedUserNameReq(user)) {
  //         console.log('Interceptor Invoke!');
  //         user.name = 'PRIVATE_USER_NAME';
  //       }
  //     });
  //   }
  //   return res;
  // }

  // Interceptor at User Type(Recommended)
  if (Array.isArray(res)) {
    const notAllowedUserNameReq = (user: User) =>
      // if current type is not User, skip it
      user?.name?.includes(userNameContains) ?? false;

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
  }

  return res;
};

export const InterceptorOnSpecificUser: MiddlewareFn = InterceptorOnUserEntityRequest(
  '张三'
);
