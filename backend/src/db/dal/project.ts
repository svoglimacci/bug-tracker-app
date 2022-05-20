import { Op } from 'sequelize/types';
import { Project } from '../models';
import { ProjectInput, ProjectOutput } from '../models/Project';
import { GetAllProjectsFilters } from './types';

export const create = (payload: ProjectInput): Promise<ProjectOutput> => Project.create(payload);

export const update = async (
  id: number,
  payload: Partial<ProjectInput>,
): Promise<ProjectOutput> => {
  const project = await Project.findByPk(id);

  if (!project) {
    throw new Error();
  }

  return project.update(payload);
};

export const getById = async (id: number): Promise<ProjectOutput> => {
  const project = await Project.findByPk(id);

  if (!project) {
    throw new Error();
  }

  return project;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedProjects = await Project.destroy({
    where: { id },
  });

  return !!numDeletedProjects;
};

export const getAll = async (filters: GetAllProjectsFilters): Promise<ProjectOutput[]> =>
  Project.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
