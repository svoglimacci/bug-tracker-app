/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from '../store';
import usersService from '../services/users';
import { setMessage } from './messageReducer';

interface User {
  id: number;
  username: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    setUsersLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setUsers, setUsersLoading } = usersSlice.actions;

export const getUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setUsersLoading());
    const allUsers = await usersService.fetch();

    dispatch(setUsers(allUsers));
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(setMessage(message));
  }
};

export const selectUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);
export default usersSlice.reducer;
