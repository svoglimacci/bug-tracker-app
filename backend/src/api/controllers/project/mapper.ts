import { ProjectOutput } from '../../../db/models/Project';
import { Project } from '../../interfaces';

export const toProject = (project: ProjectOutput): Project => ({
  id: project.id,
  title: project.title,
  author: project.author,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
  deletedAt: project.deletedAt,
});

export default toProject;
