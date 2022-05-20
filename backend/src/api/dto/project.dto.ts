import { Optional } from 'sequelize/types';

export type CreateProjectDTO = {
  title: string;
  author: string;
};

export type UpdateProjectDTO = Optional<CreateProjectDTO, 'title'>;
