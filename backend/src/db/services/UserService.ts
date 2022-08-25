import * as userDal from '../dal/user';
import { GetAllUsersFilters } from '../dal/types';
import { UserInput, UserOutput } from '../models/User';

export const create = async (payload: UserInput): Promise<UserOutput> => userDal.create(payload);

export const getById = async (id: number): Promise<UserOutput> => userDal.getById(id);

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> =>
  userDal.update(id, payload);

export const deleteById = async (id: number): Promise<boolean> => userDal.deleteById(id);

export const getAll = async (filters: GetAllUsersFilters): Promise<UserOutput[]> =>
  userDal.getAll(filters);
