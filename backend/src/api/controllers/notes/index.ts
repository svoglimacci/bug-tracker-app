import { Note } from '../../interfaces';
import * as mapper from './mapper';
import * as service from '../../../db/services/noteService';
import { CreateNoteDTO, UpdateNoteDTO } from '../../dto/note.dto';
import { GetAllNotesFilters } from '../../../db/dal/types';

export const create = async (payload: CreateNoteDTO): Promise<Note> =>
  mapper.toNote(await service.create(payload));

export const update = async (id: number, payload: UpdateNoteDTO): Promise<Note> =>
  mapper.toNote(await service.update(id, payload));

export const getById = async (id: number): Promise<Note> =>
  mapper.toNote(await service.getById(id));

export const deleteById = (id: number): Promise<boolean> => service.deleteById(id);

export const getAll = async (filters: GetAllNotesFilters): Promise<Note[]> => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const notes = await service.getAll(filters).then((notes) => notes.map(mapper.toNote));

  return notes;
};
