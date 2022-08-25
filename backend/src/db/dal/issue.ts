import { Op } from 'sequelize';
import { Issue, Note } from '../models';
import { IssueInput, IssueOutput } from '../models/Issue';
import { GetAllIssuesFilters } from './types';

export const create = (payload: IssueInput): Promise<IssueOutput> => Issue.create(payload);

export const update = async (id: number, payload: Partial<IssueInput>): Promise<IssueOutput> => {
  const issue = await Issue.findByPk(id);

  if (!issue) {
    throw new Error();
  }

  return issue.update(payload);
};

export const getById = async (id: number): Promise<IssueOutput> => {
  const issue = await Issue.findByPk(id);

  if (!issue) {
    throw new Error();
  }

  return issue;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedIssues = await Issue.destroy({
    where: { id },
  });

  return !!numDeletedIssues;
};

export const getAll = async (filters: GetAllIssuesFilters): Promise<any> =>
  Issue.findAll({
    include: Note,
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
