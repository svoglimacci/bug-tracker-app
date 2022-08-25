import * as projectDal from '../dal/project';
import * as membershipDal from '../dal/membership';
import { GetAllProjectsFilters } from '../dal/types';
import { ProjectInput, ProjectOutput } from '../models/Project';
import { Membership } from '../models';

export const create = async (payload: ProjectInput): Promise<ProjectOutput> => {
  // eslint-disable-next-line prefer-destructuring
  const members = payload.users;
  const project = await projectDal.create(payload);

  members.forEach((element: any) => {
    membershipDal.create({ userId: element, projectId: project.id });
  });

  return project;
};
export const getById = async (id: number): Promise<ProjectOutput> => projectDal.getById(id);

export const update = async (
  id: number,
  payload: Partial<ProjectInput>,
): Promise<ProjectOutput> => {
  const project = await projectDal.update(id, payload);
  const members = payload.users;
  Membership.destroy({ where: { projectId: project.id } });
  members.forEach((element: any) => {
    Membership.findOrCreate({
      where: { userId: element, projectId: project.id },
    });
  });
  return project;
};

export const deleteById = async (id: number): Promise<boolean> => projectDal.deleteById(id);

export const getAll = async (filters: GetAllProjectsFilters): Promise<ProjectOutput[]> =>
  projectDal.getAll(filters);
