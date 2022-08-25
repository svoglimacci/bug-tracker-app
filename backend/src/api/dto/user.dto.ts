import { Optional } from 'sequelize/types';

export type CreateUserDTO = {
  name: string;
  username: string;
  password: string;
};

export type UpdateUserDTO = Optional<CreateUserDTO, 'name'>;
