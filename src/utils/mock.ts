import { plainToClass } from 'class-transformer';

import User from '../entities/User.entity';

export const createUser = (data: Partial<User>): User =>
  plainToClass(User, data);

export const getMockUser = () => {
  let users: User[] = [];

  for (let i = 0; i < 20; i++) {
    users.push(
      createUser({
        id: i + 1,
        name: `User-${i + 1}`,
      })
    );
  }
  return users;
};
