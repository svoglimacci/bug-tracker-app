import { State } from './state';

export type Action =
  | {
      type: 'REQUEST_LOGIN';
      payload: { username: string; password: string };
    }
  | { type: 'LOGIN_SUCCESS'; payload: { username: string; password: string } }
  | {
      type: 'LOGOUT';
      payload: { username: string; password: string };
    }
  | {
      type: 'LOGIN_ERROR';
      payload: null;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    case 'LOGOUT':
      return {
        ...state,
        username: '',
        password: '',
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
      };
    default:
      return state;
  }
};
