/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setMessage } from './messageReducer';
import AuthService from '../services/auth';
import type { RootState } from '../store';

const user = localStorage.getItem('user');

interface UserAttributes {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',

  async (auth: UserAttributes, thunkAPI) => {
    const data = await AuthService.login(auth);
    try {
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (userId: number) => {
  await AuthService.logout(userId);
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
