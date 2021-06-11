import { authChecker } from './authChecker';
import { UserRole } from './constants';
import { IContext } from '../typing';
import { GraphQLResolveInfo } from 'graphql';

describe('authChecker', () => {
  it('should pass when role > requiredAuthRole', () => {
    expect(
      authChecker(
        {
          root: {},
          args: {},
          context: {
            currentReqUser: {
              role: UserRole.ADMIN,
            },
          } as IContext,
          info: {} as GraphQLResolveInfo,
        },
        ['0']
      )
    ).toBeTruthy();
  });

  it('should reject when role < requiredAuthRole', () => {
    expect(
      authChecker(
        {
          root: {},
          args: {},
          context: {
            currentReqUser: {
              role: UserRole.UNLOGIN,
            },
          } as IContext,
          info: {} as GraphQLResolveInfo,
        },
        ['2']
      )
    ).toBeFalsy();
  });
});
