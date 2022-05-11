import { AuthOutput } from '../../../db/models/Auth';
import { SessionOutput } from '../../../db/models/Session';

export const toAuth = (auth: AuthOutput) => ({
  id: auth.id,
  username: auth.username,
  password: auth.password,
});

export const toSession = (auth: SessionOutput) => ({
  id: auth.id,
  userId: auth.userId,
  token: auth.token,
});
export default toAuth;
