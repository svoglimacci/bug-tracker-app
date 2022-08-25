import * as noteDal from '../dal/note';
import { GetAllNotesFilters } from '../dal/types';
import { NoteInput, NoteOutput } from '../models/Note';

export const create = async (payload: NoteInput): Promise<NoteOutput> => noteDal.create(payload);
export const getById = async (id: number): Promise<NoteOutput> => noteDal.getById(id);

export const update = async (id: number, payload: Partial<NoteInput>): Promise<NoteOutput> =>
  noteDal.update(id, payload);

export const deleteById = async (id: number): Promise<boolean> => noteDal.deleteById(id);

export const getAll = async (filters: GetAllNotesFilters): Promise<NoteOutput[]> =>
  noteDal.getAll(filters);
