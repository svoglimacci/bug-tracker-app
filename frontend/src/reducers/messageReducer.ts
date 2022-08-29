/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from '../store';
import { MessagePayload } from '../types';

interface InitialMessageState {
  message: string | null;
  type: 'success' | 'error' | null;
}

const initialState: InitialMessageState = {
  message: null,
  type: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessagePayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

let timeout: number = 0;

export const notify =
  (message: string, type: 'success' | 'error'): AppThunk =>
  (dispatch) => {
    window.clearTimeout(timeout);
    dispatch(setMessage({ message, type }));

    timeout = window.setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

export const selectMessageState = (state: RootState) => state.message;
export default messageSlice.reducer;
