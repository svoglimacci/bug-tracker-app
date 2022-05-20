import { Box, Button, ButtonGroup, Flex, Spacer } from '@chakra-ui/react';
import * as React from 'react';

import { useAppDispatch } from '../hooks';
import { logout } from '../reducers/authReducer';

export function NavBar() {
  const dispatch = useAppDispatch();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const handleLogout = async (userId: number) => {
    dispatch(logout(userId));
  };
  return (
    <Flex align="center" justify="space-between" wrap="wrap" w="100%" mb={8} p={8}>
      <Box p="2">
        <ButtonGroup variant="link" spacing="8">
          {['Home', 'Users', 'Projects'].map((item) => (
            <Button key={item}>{item}</Button>
          ))}
        </ButtonGroup>
      </Box>
      <Spacer />

      <Button
        onClick={() => {
          handleLogout(user.userId);
        }}
        variant="primary"
      >
        Log out
      </Button>
    </Flex>
  );
}

export default NavBar;
