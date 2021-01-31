export enum UserRole {
  UNLOGIN = 1,
  COMMON,
  ADMIN,
}

export interface IDefaultPagination {
  offset: number;
  take: number;
}

export const defaultPagination = {
  offset: 0,
  take: 10,
};

export const MAX_ALLOWED_COMPLEXITY = 20;
