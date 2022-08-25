import { User } from '../../interfaces/index';
import * as service from '../../../db/services/UserService';
import { CreateUserDTO, UpdateUserDTO } from '../../dto/user.dto';
import * as mapper from './mapper';
import { GetAllUsersFilters } from '../../../db/dal/types';
import { UserOutput } from '../../../db/models/User';

export const create = async (payload: CreateUserDTO): Promise<User> =>
  mapper.toUser(await service.create(payload));

export const getById = async (id: number): Promise<User> =>
  mapper.toUser(await service.getById(id));

export const update = async (id: number, payload: UpdateUserDTO): Promise<User> =>
  mapper.toUser(await service.update(id, payload));

export const deleteById = (id: number): Promise<boolean> => service.deleteById(id);

export const getAll = async (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const users = await service.getAll(filters).then((users) => users.map(mapper.toUser));

  return users;
};
