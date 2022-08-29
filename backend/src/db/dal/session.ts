import { Session } from '../models';
import { SessionInput, SessionOutput } from '../models/Session';

export const create = async (payload: SessionInput): Promise<SessionOutput> => {
  const session = await Session.create(payload);

  return session;
};

export const deleteById = async (userId: number): Promise<boolean> => {
  const deletedSession = await Session.destroy({
    where: { userId },
  });
  return !!deletedSession;
};
