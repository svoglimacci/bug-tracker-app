export interface Issue {
  id: number;
  summary: string;
  priority: string;
  status: string;
  projectId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
