import * as React from 'react';
import { ChakraProvider, Box, Link, VStack, Grid, theme } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" textAlign="center">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Link
              color="teal.500"
              fontSize="2xl"
              href="https://chakra-ui.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
