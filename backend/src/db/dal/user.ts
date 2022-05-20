import { User } from '../models';
import { UserInput, UserOutput } from '../models/User';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);

  return user;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);

  if (!user) {
    // @todo throw custom error
    throw new Error('not found');
  }

  return user;
};

export const findUser = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.findOne({
    where: {
      username: payload.username,
    },
  });
  if (!user) {
    throw new Error('invalid username or password');
  }
  return user;
};
