import * as issueDal from '../dal/issue';
import { GetAllIssuesFilters } from '../dal/types';
import { IssueInput, IssueOutput } from '../models/Issue';

export const create = async (payload: IssueInput): Promise<IssueOutput> => issueDal.create(payload);
export const getById = async (id: number): Promise<IssueOutput> => issueDal.getById(id);

export const update = async (id: number, payload: Partial<IssueInput>): Promise<IssueOutput> =>
  issueDal.update(id, payload);

export const deleteById = async (id: number): Promise<boolean> => issueDal.deleteById(id);

export const getAll = async (filters: GetAllIssuesFilters): Promise<IssueOutput[]> =>
  issueDal.getAll(filters);
