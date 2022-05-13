/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  Heading,
  HStack,
  Button,
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import type { AppDispatch } from './store';
import { useAppDispatch } from './hooks';
import authService from './services/authService';
import LoginForm from './components/LoginForm';
import HomePage from './HomePage';

function LoginPage({ handleLogin, handleLogout }: any) {
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Dont have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <LoginForm onSubmit={handleLogin} />
              <Button id="logout" onClick={handleLogout}>
                logout
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser'); // need to be stored to a cookie or use JWT
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      console.log(localStorage);
    }
  }, []);

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const user = await authService.login(values);
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      console.log('Logged in', user);
    } catch (exception) {
      console.log('Wrong credentials', user);
    }
    return user;
  };
  const handleLogout = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={LoginPage({ handleLogin, handleLogout })} />
        <Route path="/Home" element={user ? <HomePage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
