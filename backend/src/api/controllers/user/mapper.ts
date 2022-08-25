// import { UserOutput } from '../../../db/models/User';
import { UserOutput } from '../../../db/models/User';

export const toUser = (user: UserOutput): any => ({
  id: user.id,
  username: user.username,
  password: user.password,
  projects: user.projects,
});

export default toUser;
