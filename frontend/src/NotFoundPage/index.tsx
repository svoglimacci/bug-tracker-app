/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';

function NotFoundPage() {
  return (
    <Box
      py={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: '12em' }} />
      <Typography variant="h2" p={3}>
        404
      </Typography>
      <Typography variant="h4">Not found</Typography>
      <Typography variant="subtitle1">
        The Page you are looking for doesn&apos;t exist or an other error occured.
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
