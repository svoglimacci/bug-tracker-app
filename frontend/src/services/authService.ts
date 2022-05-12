import axios from 'axios';
import { LoginFormValues } from '../types';

const baseUrl = '/api/login';

// eslint-disable-next-line import/prefer-default-export
export const login = async (values: LoginFormValues) =>
  axios.post(baseUrl, values).then((response) => response.data);
