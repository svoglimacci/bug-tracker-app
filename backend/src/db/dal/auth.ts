import { AuthInput, AuthOutput } from '../models/Auth';
import User from '../models/User';

export const login = async (payload: AuthInput): Promise<AuthOutput> => {
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

export const logout = async (payload: AuthInput): Promise<AuthOutput> => {
  const user = await User.findByPk(payload.username);
  if (!user) {
    throw new Error('not found');
  }
  return user;
};
