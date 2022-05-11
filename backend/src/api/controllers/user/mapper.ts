import User from '../../interfaces/user.interface';
import { UserOutput } from '../../../db/models/User';

export const toUser = (user: UserOutput): User => ({
  id: user.id,
  email: user.email,
  username: user.username,
  password: user.password,
});

export default toUser;
