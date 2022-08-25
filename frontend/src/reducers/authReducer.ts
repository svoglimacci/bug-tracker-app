/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppThunk } from '../store';
import authService from '../services/auth';
import { setMessage } from './messageReducer';

const user = localStorage.getItem('user');

interface AuthState {
  id: number;
  token: string;
  userId: number;
}

interface InitialAuthState {
  user: AuthState | null;
  isLoggedIn: boolean;
}

interface CredentialsPayload {
  username: string;
  password: string;
}

const initialState: InitialAuthState = user
  ? {
      user: JSON.parse(user),
      isLoggedIn: true,
    }
  : { user: null, isLoggedIn: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export const login =
  (credentials: CredentialsPayload): AppThunk =>
  async (dispatch) => {
    try {
      const userData = await authService.login(credentials);
      dispatch(setUser(userData));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const logout =
  (userId: number): AppThunk =>
  async (dispatch) => {
    try {
      await authService.logout(userId);
      dispatch(removeUser());
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };

export const register =
  (credentials: CredentialsPayload): AppThunk =>
  async (dispatch) => {
    try {
      const userData = await authService.register(credentials);
      dispatch(setUser(userData));
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
    }
  };
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
