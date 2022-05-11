import { Optional } from 'sequelize/types';

export type CreateUserDTO = {
  email: string;
  username: string;
  password: string;
};

export type UpdateUserDTO = Optional<CreateUserDTO, 'username'>;

export type FilterUsersDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
