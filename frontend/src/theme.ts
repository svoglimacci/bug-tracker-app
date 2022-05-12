import { extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

const theme = extendTheme({
  styles: {
    global: (props: Dict<any> | StyleFunctionProps) => ({
      body: {
        bg: mode('gray.100', 'whiteAlpha.900')(props),
      },
    }),
  },
});

export default theme;
