/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
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
import authService from '../services/authService';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const [user, setUser] = useState(null); // server response saved to the user field

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const user = await authService.login(values);
      setUser(user);
      console.log('Logged in', user);
    } catch (exception) {
      console.log('Wrong credentials', user);
    }
  };

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
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
export default LoginPage;
