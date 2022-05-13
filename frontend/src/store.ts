import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/messageReducer';
import authReducer from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
