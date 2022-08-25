import { IssueOutput } from '../../../db/models/Issue';

export const toIssue = (issue: IssueOutput): any => ({
  id: issue.id,
  summary: issue.summary,
  priority: issue.priority,
  status: issue.status,
  projectId: issue.projectId,
  userId: issue.userId,
  notes: issue.notes,
  createdAt: issue.createdAt,
  updatedAt: issue.updatedAt,
  deletedAt: issue.deletedAt,
});

export default toIssue;
