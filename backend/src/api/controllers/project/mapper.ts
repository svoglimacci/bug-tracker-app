import { ProjectOutput } from '../../../db/models/Project';

export const toProject = (project: ProjectOutput): any => ({
  id: project.id,
  title: project.title,
  description: project.description,
  users: project.users,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
  deletedAt: project.deletedAt,
});

export default toProject;
