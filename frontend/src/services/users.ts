import axios from 'axios';

import apiBaseUrl from '../constants';

const fetch = async () => {
  const response = await axios.get(`${apiBaseUrl}/users`);

  return response.data;
};

const userService = { fetch };

export default userService;
