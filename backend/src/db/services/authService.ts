import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Session, { SessionInput } from '../models/Session';
import * as authDal from '../dal/auth';
import { AuthInput, AuthOutput } from '../models/Auth';
import { SECRET } from '../config';

export const login = async (payload: AuthInput): Promise<AuthOutput> => {
  const user = await authDal.login(payload);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(payload.password, user.password);

  if (!(user && passwordCorrect)) {
    throw new Error('invalid username or password');
  }
  const userToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userToken, SECRET);

  await Session.create({ token, userId: user.id });

  return user;
};

export const logout = async (payload: SessionInput) => {
  await Session.destroy({
    where: {
      userId: payload.userId,
    },
  });
  throw new Error('Session destroyed');
};
export default login;
