import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../reducers/authReducer';
import { useAppDispatch } from '../hooks';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (values: { username: string; password: string }) => {
    dispatch(login(values));
    navigate(from, { replace: true });
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
