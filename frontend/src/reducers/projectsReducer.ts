/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from '../store';
import projectsService from '../services/projects';
import { notify } from './messageReducer';
import { ProjectPayload, Project, User } from '../types';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);

      state.loading = false;
    },
    updateProject: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
        users: User[];
        updatedAt: Date;
      }>,
    ) => {
      state.projects = state.projects.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p,
      );
      state.loading = false;
    },

    setProjectsLoading: (state) => {
      state.loading = true;
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProjects, addProject, setProjectsLoading, removeProject, updateProject } =
  projectsSlice.actions;

export const createProject =
  (projectData: ProjectPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setProjectsLoading());
      const newProject = await projectsService.create(projectData);
      dispatch(addProject(newProject));
      dispatch(notify('Project added!', 'success'));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(notify(`${message}`, 'error'));
    }
  };

export const editProject =
  (projectData: ProjectPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setProjectsLoading());
      const updatedProject = await projectsService.edit(projectData);
      dispatch(notify('Project updated!', 'success'));
      dispatch(updateProject(updatedProject));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(notify(`${message}`, 'error'));
    }
  };
export const getProjects = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setProjectsLoading());
    const allProjects = await projectsService.fetch();

    dispatch(setProjects(allProjects));
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(notify(`${message}`, 'error'));
  }
};

export const deleteProject =
  (projectId: number): AppThunk =>
  async (dispatch) => {
    try {
      await projectsService.remove(projectId);
      dispatch(removeProject(projectId));
      dispatch(notify('Project deleted!', 'success'));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(notify(`${message}`, 'error'));
    }
  };

export const selectProjects = (state: RootState) => state.projects;

export const selectProjectById = (state: RootState, projectId: number) =>
  state.projects.projects.find((project) => project.id === projectId);

export default projectsSlice.reducer;
