import type { UserRole } from './utils/constants';
import type { IMidwayContainer } from '@midwayjs/core';

export interface IContext {
  currentReqUser: {
    role: UserRole;
  };
  container: IMidwayContainer;
}
