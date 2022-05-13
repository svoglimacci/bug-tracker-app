import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { RootState } from './store';

// eslint-disable-next-line react/function-component-definition
const PrivateRoute: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn, children }) => {
  const location = useLocation();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isLoggedIn ? <>{children}</> : <Navigate to="/" state={{ from: location }} />;
};

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/Home" />} />
        <Route
          path="home"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
