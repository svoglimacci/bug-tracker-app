import axios from 'axios';
import React from 'react';
import apiBaseUrl from '../constants';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      await axios.post(`${apiBaseUrl}/login`, values);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error?.response?.data || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', error);
      }
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
export default LoginPage;
