import User from '../../interfaces';
import { UserOutput } from '../../../db/models/User';

export const toUser = (user: UserOutput): User => ({
  id: user.id,
  name: user.name,
  username: user.username,
  password: user.passwordHash,
});

export default toUser;
