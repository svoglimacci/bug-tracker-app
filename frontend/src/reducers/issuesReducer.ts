/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from '../store';
import issuesService from '../services/issues';
import { setMessage } from './messageReducer';
import { IssuePayload, Issue, NotePayload, Priority, Status } from '../types';

interface IssuesState {
  issues: Issue[];
  loading: boolean;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
};

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
      state.loading = false;
    },
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
      state.loading = false;
    },
    setIssuesLoading: (state) => {
      state.loading = true;
    },
    removeIssue: (state, action: PayloadAction<number>) => {
      state.issues = state.issues.filter((p) => p.id !== action.payload);
    },
    addNote: (
      state,
      action: PayloadAction<{
        id: number;
        userId: number;
        summary: string;
        issueId: number;
        createdAt: Date;
      }>,
    ) => {
      const issueIndex = state.issues.findIndex((el) => el.id === action.payload.issueId);
      state.issues[issueIndex].notes.push(action.payload);
    },

    removeNote: (state, action: PayloadAction<{ noteId: number; issueId: number }>) => {
      const issueIndex = state.issues.findIndex((el) => el.id === action.payload.issueId);
      state.issues[issueIndex].notes = state.issues[issueIndex].notes.filter(
        (p) => p.id !== action.payload.noteId,
      );
    },
    updateNote: (
      state,
      action: PayloadAction<{
        summary: string;
        updatedAt: Date;
        issueId: number;
        id: number;
      }>,
    ) => {
      const issueIndex = state.issues.findIndex((el) => el.id === action.payload.issueId);
      state.issues[issueIndex].notes = state.issues[issueIndex].notes.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p,
      );
      state.loading = false;
    },
    updateIssue: (
      state,
      action: PayloadAction<{
        id: number;
        summary: string;
        priority: Priority;
        status: Status;
        updatedAt: Date;
      }>,
    ) => {
      state.issues = state.issues.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p,
      );
      state.loading = false;
    },
  },
});

export const {
  setIssues,
  addIssue,
  setIssuesLoading,
  removeIssue,
  addNote,
  removeNote,
  updateIssue,
  updateNote,
} = issuesSlice.actions;

export const deleteNote =
  (issueId: number, noteId: number): AppThunk =>
  async (dispatch) => {
    try {
      await issuesService.removeNote(noteId);
      dispatch(removeNote({ noteId, issueId }));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const createNote =
  (noteData: NotePayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIssuesLoading());
      const newNote = await issuesService.createNote(noteData);
      dispatch(addNote(newNote));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const createIssue =
  (issueData: IssuePayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIssuesLoading());
      const newIssue = await issuesService.create(issueData);
      dispatch(addIssue(newIssue));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const editNote =
  (noteData: NotePayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIssuesLoading());
      const updatedNote = await issuesService.editNote(noteData);
      dispatch(updateNote(updatedNote));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const editIssue =
  (issueData: IssuePayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIssuesLoading());
      const updatedIssue = await issuesService.edit(issueData);
      dispatch(updateIssue(updatedIssue));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const getIssues = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIssuesLoading());
    const allIssues = await issuesService.fetch();

    dispatch(setIssues(allIssues));
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(setMessage(message));
  }
};

export const deleteIssue =
  (issueId: number): AppThunk =>
  async (dispatch) => {
    try {
      await issuesService.remove(issueId);
      dispatch(removeIssue(issueId));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const selectIssues = (state: RootState) => state.issues;

export const selectIssueById = (state: RootState, issueId: number) =>
  state.issues.issues.find((issue) => issue.id === issueId);

export default issuesSlice.reducer;
