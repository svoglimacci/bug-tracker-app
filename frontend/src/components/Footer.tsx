import { Flex, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';

export default function App() {
  return (
    <Flex align="center" direction="column" w="100%" mb={8} p={8}>
      <VStack>
        <Text>Bugtracker</Text>
        <Text>Simon Voglimacci © 2022 </Text>
      </VStack>
    </Flex>
  );
}
