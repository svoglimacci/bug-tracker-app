import axios from 'axios';

import apiBaseUrl from '../constants';
import { IssuePayload, NotePayload } from '../types';

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/issues`);

  return response.data;
};

const fetchById = async (issueId: number) => {
  const response = await axios.get(`${apiBaseUrl}/issues/${issueId}`);

  return response.data;
};

const create = async (issueData: IssuePayload) => {
  const response = await axios.post(`${apiBaseUrl}/issues`, issueData);

  return response.data;
};

const createNote = async (noteData: NotePayload) => {
  const response = await axios.post(`${apiBaseUrl}/notes/`, noteData);

  return response.data;
};

const removeNote = async (noteId: number) => {
  const response = await axios.delete(`${apiBaseUrl}/notes/${noteId}`);

  return response.data;
};

const remove = async (issueId: number) => {
  const response = await axios.delete(`${apiBaseUrl}/issues/${issueId}`);

  return response.data;
};

const edit = async (issueData: IssuePayload) => {
  const response = await axios.put(`${apiBaseUrl}/issues/${issueData.id}`, issueData);

  return response.data;
};

const editNote = async (noteData: NotePayload) => {
  const response = await axios.put(`${apiBaseUrl}/notes/${noteData.id}`, noteData);

  return response.data;
};

const issueService = { fetch, fetchById, create, remove, createNote, edit, removeNote, editNote };

export default issueService;
