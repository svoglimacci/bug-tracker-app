import axios from 'axios';
import apiBaseUrl from '../constants';
/*
const register = (credentials: { username: string; password: string }) =>
  axios.post(`${apiBaseUrl}/users`, credentials).then((response) => {
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
*/

const login = (credentials: { username: string; password: string }) =>
  axios.post(`${apiBaseUrl}/login`, credentials).then((response) => {
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });

const logout = (userId: number) => {
  const params = { userId };
  axios.delete(`${apiBaseUrl}/logout`, { data: params }).then((response) => {
    if (response) {
      localStorage.removeItem('user');
    }
    return response.status;
  });
};

export default { login, logout };
