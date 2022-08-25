export interface Note {
  id: number;
  summary: string;
  issueId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
