import axios from 'axios';
import apiBaseUrl from '../constants';

const register = (username: string, password: string) =>
  axios.post(`${apiBaseUrl}/users`, {
    username,
    password,
  });

const login = (credentials: { username: string; password: string }) =>
  axios.post(`${apiBaseUrl}/login`, credentials).then((response) => {
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('logged in', response.data);
    }
    return response.data;
  });

const logout = (userId: number) => {
  const params = { userId };
  axios.delete(`${apiBaseUrl}/logout`, { data: params }).then((response) => {
    if (response) {
      console.log('logged out', userId);
      localStorage.removeItem('user');
    }
    return response.status;
  });
};

export default { login, logout, register };
