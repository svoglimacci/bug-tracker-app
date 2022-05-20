import { Project } from '../../interfaces';
import * as mapper from './mapper';
import * as service from '../../../db/services/ProjectService';
import { CreateProjectDTO, UpdateProjectDTO } from '../../dto/project.dto';
import { GetAllProjectsFilters } from '../../../db/dal/types';

export const create = async (payload: CreateProjectDTO): Promise<Project> =>
  mapper.toProject(await service.create(payload));

export const update = async (id: number, payload: UpdateProjectDTO): Promise<Project> =>
  mapper.toProject(await service.update(id, payload));

export const getById = async (id: number): Promise<Project> =>
  mapper.toProject(await service.getById(id));

export const deleteById = (id: number): Promise<boolean> => service.deleteById(id);

export const getAll = async (filters: GetAllProjectsFilters): Promise<Project[]> => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const projects = await service.getAll(filters).then((projects) => projects.map(mapper.toProject));

  return projects;
};
