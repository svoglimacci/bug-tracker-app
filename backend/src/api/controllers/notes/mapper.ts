import { NoteOutput } from '../../../db/models/Note';

export const toNote = (note: NoteOutput): any => ({
  id: note.id,
  summary: note.summary,
  issueId: note.issueId,
  userId: note.userId,
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
  deletedAt: note.deletedAt,
});

export default toNote;
