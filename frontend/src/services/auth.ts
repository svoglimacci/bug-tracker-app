import axios from 'axios';
import apiBaseUrl from '../constants';

const register = (username: string, password: string) =>
  axios.post(`${apiBaseUrl}/users`, {
    username,
    password,
  });

const login = (credentials: { username: string; password: string }) =>
  axios.post(`${apiBaseUrl}/login`, credentials).then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default { login, logout, register };
