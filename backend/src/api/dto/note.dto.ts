import { Optional } from 'sequelize/types';

export type CreateNoteDTO = {
  summary: string;
  issueId: number;
  userId: number;
};

export type UpdateNoteDTO = Optional<CreateNoteDTO, 'summary'>;
