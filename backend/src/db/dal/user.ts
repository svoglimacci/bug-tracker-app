import { Op } from 'sequelize';
import { Project, User } from '../models';
import { UserInput, UserOutput } from '../models/User';
import { GetAllUsersFilters } from './types';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);

  return user;
};
export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
  const project = await User.findByPk(id);

  if (!project) {
    throw new Error();
  }

  return project.update(payload);
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);

  if (!user) {
    // @todo throw custom error
    throw new Error('not found');
  }

  return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedProjects = await User.destroy({
    where: { id },
  });

  return !!numDeletedProjects;
};

export const getAll = async (filters: GetAllUsersFilters): Promise<any> =>
  User.findAll({
    include: [
      {
        model: Project,
        as: 'projects',
        attributes: ['title', 'id'],
        through: {
          attributes: [],
        },
      },
    ],
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });

export const findUser = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.findOne({
    where: {
      username: payload.username,
    },
  });
  if (!user) {
    throw new Error('invalid username or password');
  }
  return user;
};
