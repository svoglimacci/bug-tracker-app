import * as userDal from '../dal/user';
import { GetAllUsersFilters } from '../dal/types';
import { UserInput, UserOutput } from '../models/User';

export const create = (payload: UserInput): Promise<UserOutput> => userDal.create(payload);

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> =>
  userDal.update(id, payload);
export const getById = (id: number): Promise<UserOutput> => userDal.getById(id);
export const deleteById = (id: number): Promise<boolean> => userDal.deleteById(id);
export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> =>
  userDal.getAll(filters);
