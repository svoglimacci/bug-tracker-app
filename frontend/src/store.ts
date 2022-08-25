import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import authSlice from './reducers/authReducer';
import issuesReducer from './reducers/issuesReducer';

import projectsReducer from './reducers/projectsReducer';
import userSlice from './reducers/usersReducer';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    projects: projectsReducer,
    issues: issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
