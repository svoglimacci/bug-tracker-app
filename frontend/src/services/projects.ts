import axios from 'axios';

import apiBaseUrl from '../constants';
import { ProjectPayload } from '../types';

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/projects`);

  return response.data;
};

const fetchById = async (projectId: number) => {
  const response = await axios.get(`${apiBaseUrl}/projects/${projectId}`);

  return response.data;
};

const create = async (projectData: ProjectPayload) => {
  const response = await axios.post(`${apiBaseUrl}/projects`, projectData);

  return response.data;
};

const remove = async (projectId: number) => {
  const response = await axios.delete(`${apiBaseUrl}/projects/${projectId}`);

  return response.data;
};

const edit = async (projectData: ProjectPayload) => {
  const response = await axios.put(`${apiBaseUrl}/projects/${projectData.projectId}`, projectData);

  return response.data;
};

const projectService = { fetch, fetchById, create, remove, edit };
export default projectService;
