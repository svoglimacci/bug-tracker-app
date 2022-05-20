import { Session } from '../../interfaces/index';
import * as service from '../../../db/services/session';
import { LoginDTO } from '../../dto/session.dto';
import * as mapper from './mapper';

export const login = async (payload: LoginDTO): Promise<Session> =>
  mapper.toSession(await service.login(payload));

export const logout = async (id: number): Promise<Boolean> => {
  const isLoggedOut = await service.logout(id);

  return isLoggedOut;
};
