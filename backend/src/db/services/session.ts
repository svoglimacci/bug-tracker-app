import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userDal from '../dal/user';
import * as sessionDal from '../dal/session';

import { SECRET } from '../config';
import { UserInput } from '../models/User';
import { SessionOutput } from '../models/Session';

export const login = async (payload: UserInput): Promise<SessionOutput> => {
  const user = await userDal.findUser(payload);

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

  const session = await sessionDal.create({ token, userId: user.id });

  return session;
};

export const logout = (id: number): Promise<boolean> => sessionDal.deleteById(id);

export default login;
