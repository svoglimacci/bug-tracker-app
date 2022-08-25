import { Op } from 'sequelize';
import { Note } from '../models';
import { NoteInput, NoteOutput } from '../models/Note';
import { GetAllNotesFilters } from './types';

export const create = (payload: NoteInput): Promise<NoteOutput> => Note.create(payload);

export const update = async (id: number, payload: Partial<NoteInput>): Promise<NoteOutput> => {
  const note = await Note.findByPk(id);

  if (!note) {
    throw new Error();
  }

  return note.update(payload);
};

export const getById = async (id: number): Promise<NoteOutput> => {
  const note = await Note.findByPk(id);

  if (!note) {
    throw new Error();
  }

  return note;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedNotes = await Note.destroy({
    where: { id },
  });

  return !!numDeletedNotes;
};

export const getAll = async (filters: GetAllNotesFilters): Promise<any> =>
  Note.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
