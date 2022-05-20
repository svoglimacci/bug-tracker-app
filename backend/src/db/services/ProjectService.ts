import * as projectDal from '../dal/project';
import { GetAllProjectsFilters } from '../dal/types';
import { ProjectInput, ProjectOutput } from '../models/Project';

export const create = async (payload: ProjectInput): Promise<ProjectOutput> =>
  projectDal.create(payload);

export const getById = async (id: number): Promise<ProjectOutput> => projectDal.getById(id);

export const update = async (id: number, payload: Partial<ProjectInput>): Promise<ProjectOutput> =>
  projectDal.update(id, payload);

export const deleteById = async (id: number): Promise<boolean> => projectDal.deleteById(id);

export const getAll = async (filters: GetAllProjectsFilters): Promise<ProjectOutput[]> =>
  projectDal.getAll(filters);
