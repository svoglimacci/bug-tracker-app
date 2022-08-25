import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { register } from '../reducers/authReducer';
import { useAppDispatch } from '../hooks';
import SignupForm from '../components/SignupForm';

function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleRegister = async (values: { username: string; password: string }) => {
    dispatch(register(values));
    navigate(from, { replace: true });
  };

  return (
    <div>
      <SignupForm onSubmit={handleRegister} />
    </div>
  );
}

export default SignupPage;
