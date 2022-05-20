import { SessionOutput } from '../../../db/models/Session';
import { Session } from '../../interfaces';

export const toSession = (session: SessionOutput): Session => ({
  id: session.id,
  token: session.token,
  userId: session.userId,
});

export default toSession;
