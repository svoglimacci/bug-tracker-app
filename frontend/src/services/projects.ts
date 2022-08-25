import axios from 'axios';

import apiBaseUrl from '../constants';
import { ProjectPayload } from '../types';

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/projects`);
  console.log('this is getProjects response', response.data);
  return response.data;
};

const fetchById = async (projectId: number) => {
  const response = await axios.get(`${apiBaseUrl}/projects/${projectId}`);
  console.log('this is getProjects response', response.data);
  return response.data;
};

const create = async (projectData: ProjectPayload) => {
  const response = await axios.post(`${apiBaseUrl}/projects`, projectData);
  console.log('this is createProjects response', response.data);
  return response.data;
};

const remove = async (projectId: number) => {
  const response = await axios.delete(`${apiBaseUrl}/projects/${projectId}`);
  console.log('this is deleteProjects response', response.data);
  return response.data;
};

const edit = async (projectData: ProjectPayload) => {
  const response = await axios.put(`${apiBaseUrl}/projects/${projectData.projectId}`, projectData);
  console.log('this is editProjects response', response.data);
  return response.data;
};

const projectService = { fetch, fetchById, create, remove, edit };
export default projectService;
