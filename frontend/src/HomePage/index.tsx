import React from 'react';

import { Flex, Stack, Box, Heading } from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <Flex direction="column" align="center" maxW="1200px" m="0 auto">
      <NavBar />
      <Stack spacing={8} direction="row">
        <Box w="200px" p={5} shadow="md" borderWidth="1px">
          <Heading pb={5} fontSize="md">
            Open
          </Heading>
          <Box p={5} shadow="md" borderWidth="1px" />
        </Box>
        <Box w="200px" p={5} shadow="md" borderWidth="1px">
          <Heading pb={5} fontSize="md">
            In Progress
          </Heading>
          <Box p={5} shadow="md" borderWidth="1px" />
        </Box>
        <Box w="200px" p={5} shadow="md" borderWidth="1px">
          <Heading pb={5} fontSize="md">
            In Review
          </Heading>
          <Box p={5} shadow="md" borderWidth="1px" />
        </Box>
        <Box w="200px" p={5} shadow="md" borderWidth="1px">
          <Heading pb={5} fontSize="md">
            Closed
          </Heading>
          <Box p={5} shadow="md" borderWidth="1px" />
        </Box>
      </Stack>
      <Footer />
    </Flex>
  );
}

export default HomePage;
