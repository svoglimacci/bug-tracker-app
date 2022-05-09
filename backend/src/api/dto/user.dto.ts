import { Optional } from 'sequelize/types';

export type CreateUserDTO = {
  id: number;
  name: string;
  username: string;
  passwordHash: string;
};

export type UpdateUserDTO = Optional<CreateUserDTO, 'username'>;

export type FilterUsersDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
