import { plainToClass } from 'class-transformer';
import { ClassType } from 'type-graphql';

import User from '../entities/User.entity';
import Post from '../entities/Post.entity';
import Profile from '../entities/Profile.entity';

export const createEntityData = <T extends ClassType>(
  entity: T,
  data: Partial<T>
): T => plainToClass(entity, data);

export const createMockUserData = async (): Promise<void> => {
  const users: User[] = [];

  for (let i = 0; i < 5; i++) {
    const mockUser = new User();
    mockUser.name = `User-${Math.floor(Math.random() * 1000)}`;

    const mockProfile = new Profile();
    mockProfile.description = 'A Coder';

    const mockPost = new Post();
    mockPost.title = 'The Power of MidwayJS';
    mockPost.content = 'enjoy it!';

    mockUser.profile = mockProfile;
    mockUser.posts = [mockPost];

    await mockUser.save();
  }
};
