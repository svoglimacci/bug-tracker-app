// import Auth from '../../../db/models/Auth';
import * as service from '../../../db/services/authService';
import { LoginAuthDTO, LogoutAuthDTO } from '../../dto/auth.dto';

import * as mapper from './mapper';

export const login = async (payload: LoginAuthDTO): Promise<Object> =>
  mapper.toAuth(await service.login(payload));

export const logout = async (payload: LogoutAuthDTO): Promise<Object> =>
  mapper.toSession(await service.logout(payload));
