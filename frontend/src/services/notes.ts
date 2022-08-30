import axios from 'axios';

import apiBaseUrl from '../constants';
import { NotePayload } from '../types';

const create = async (noteData: NotePayload) => {
  const response = await axios.post(`${apiBaseUrl}/notes/`, noteData);

  return response.data;
};

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/notes`);

  return response.data;
};

const fetchById = async (noteId: number) => {
  const response = await axios.get(`${apiBaseUrl}/notes/${noteId}`);

  return response.data;
};
const remove = async (noteId: number) => {
  const response = await axios.delete(`${apiBaseUrl}/notes/${noteId}`);

  return response.data;
};

const noteService = { create, fetch, fetchById, remove };
export default noteService;
