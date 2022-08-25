import axios from 'axios';

import apiBaseUrl from '../constants';

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/users`);
  console.log('this is getUsers response', response.data);
  return response.data;
};

const userService = { fetch };

export default userService;
