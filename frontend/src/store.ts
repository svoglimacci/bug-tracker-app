import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import issuesReducer from './reducers/issuesReducer';
import messageReducer from './reducers/messageReducer';
import projectsReducer from './reducers/projectsReducer';
import userReducer from './reducers/usersReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    projects: projectsReducer,
    issues: issuesReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
