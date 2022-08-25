import { Optional } from 'sequelize/types';

export type CreateIssueDTO = {
  summary: string;
  priority: string;
  status: string;
  userId: number;
  projectId: number;
  notes?: any;
};

export type UpdateIssueDTO = Optional<CreateIssueDTO, 'summary'>;
