export interface ProjectState {
  id: number;
  title: string;
  description: string;
  users: ProjectMember[];
  issues: Issue[];
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export enum Priority {
  Urgent = 'Urgent',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum Status {
  Open = 'Open',
  Closed = 'Closed',
  InProgress = 'In progress',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
  Invalid = 'Invalid',
  Feedback = 'Feedback',
}
export interface IssueState {
  id: number;
  summary: string;
  priority: Priority;
  status: Status;
  notes: Note[];
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Issue {
  id: number;
  summary: string;
  priority: Priority;
  status: Status;
  projectId: number;
  userId: number;
  notes: Note[];
}

export interface Note {
  id: number;
  userId: number;
  summary: string;
  createdAt: Date;
  issueId: number;
}

export interface IssuePayload {
  summary: string;
  priority: Priority;
  status: Status;
  userId: number;
  projectId: number;
  id?: number;
}

export interface AuthState {
  id: number;
  token: string;
  userId: number;
}

export interface ProjectMember {
  id: number;
  joinedAt: Date;
  user: User;
}
export interface Project {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
  users: User[];
}

export interface User {
  id: number;
  username: string;
}

export interface UserState {
  id: number;
  username: string;
  token: string;
}

export interface ProjectPayload {
  title: string;
  description: string;
  users: number[];
  projectId?: number;
}

export interface NotePayload {
  summary: string;
  issueId: number;
  userId: number;
  id?: number;
}
