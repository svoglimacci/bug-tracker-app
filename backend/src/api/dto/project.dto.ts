import { Optional } from 'sequelize/types';

export type CreateProjectDTO = {
  title: string;
  description: string;
  members?: any;
};

export type UpdateProjectDTO = Optional<CreateProjectDTO, 'title'>;
