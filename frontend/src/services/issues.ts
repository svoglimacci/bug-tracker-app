import axios from 'axios';

import apiBaseUrl from '../constants';
import { IssuePayload, NotePayload } from '../types';

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/issues`);
  console.log('this is getIssues response', response.data);
  return response.data;
};

const fetchById = async (issueId: number) => {
  const response = await axios.get(`${apiBaseUrl}/issues/${issueId}`);
  console.log('this is getIssue response', response.data);
  return response.data;
};

const create = async (issueData: IssuePayload) => {
  const response = await axios.post(`${apiBaseUrl}/issues`, issueData);
  console.log('this is createIssue response', response.data);
  return response.data;
};

const createNote = async (noteData: NotePayload) => {
  const response = await axios.post(`${apiBaseUrl}/notes/`, noteData);
  console.log('this is createNote response', response.data);
  return response.data;
};

const removeNote = async (noteId: number) => {
  console.log(noteId);
  const response = await axios.delete(`${apiBaseUrl}/notes/${noteId}`);
  console.log('this is deleteNote response', response.data);
  return response.data;
};

const remove = async (issueId: number) => {
  const response = await axios.delete(`${apiBaseUrl}/issues/${issueId}`);
  console.log('this is deleteIssue response', response.data);
  return response.data;
};

const edit = async (issueData: IssuePayload) => {
  const response = await axios.put(`${apiBaseUrl}/issues/${issueData.id}`, issueData);
  console.log('this is editProjects response', response.data);
  return response.data;
};

const editNote = async (noteData: NotePayload) => {
  const response = await axios.put(`${apiBaseUrl}/notes/${noteData.id}`, noteData);
  console.log('this is editProjects response', response.data);
  return response.data;
};

const issueService = { fetch, fetchById, create, remove, createNote, edit, removeNote, editNote };

export default issueService;
