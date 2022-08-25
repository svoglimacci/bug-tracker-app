import { Issue } from '../../interfaces';
import * as mapper from './mapper';
import * as service from '../../../db/services/IssueService';
import { CreateIssueDTO, UpdateIssueDTO } from '../../dto/issue.dto';
import { GetAllIssuesFilters } from '../../../db/dal/types';

export const create = async (payload: CreateIssueDTO): Promise<Issue> =>
  mapper.toIssue(await service.create(payload));

export const update = async (id: number, payload: UpdateIssueDTO): Promise<Issue> =>
  mapper.toIssue(await service.update(id, payload));

export const getById = async (id: number): Promise<Issue> =>
  mapper.toIssue(await service.getById(id));

export const deleteById = (id: number): Promise<boolean> => service.deleteById(id);

export const getAll = async (filters: GetAllIssuesFilters): Promise<Issue[]> => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const issues = await service.getAll(filters).then((issues) => issues.map(mapper.toIssue));

  return issues;
};
