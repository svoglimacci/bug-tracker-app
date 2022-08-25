import React, { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, CssBaseline } from '@mui/material';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

import ProjectsPage from './ProjectsPage';
import { RootState } from './store';
import NavBar from './components/NavBar';
import { useAppDispatch } from './hooks';
import { getProjects } from './reducers/projectsReducer';
import { getUsers } from './reducers/usersReducer';
import { getIssues } from './reducers/issuesReducer';
import ProjectPage from './ProjectPage';
import IssuePage from './IssuePage';
// eslint-disable-next-line react/function-component-definition
const PrivateRoute: React.FC<{ isLoggedIn: boolean; children: ReactNode }> = ({
  isLoggedIn,
  children,
}) => {
  const location = useLocation();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isLoggedIn ? <>{children}</> : <Navigate to="/" state={{ from: location }} />;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProjects());
    dispatch(getIssues());
  }, []);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Router>
      <CssBaseline />
      <Container>
        {isLoggedIn ? <NavBar /> : null}
        <Routes>
          <Route path="/" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/Projects" />} />
          <Route
            path="/register"
            element={!isLoggedIn ? <SignupPage /> : <Navigate to="/Register" />}
          />

          <Route
            path="projects"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ProjectsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ProjectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/issues/:issueId"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <IssuePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
