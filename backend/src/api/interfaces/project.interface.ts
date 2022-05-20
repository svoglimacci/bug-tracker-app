export interface Project {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
