/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { useForm, useController, UseControllerProps } from 'react-hook-form';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  AlertTitle,
  Paper,
  Stack,
} from '@mui/material';
import BugReport from '@mui/icons-material/BugReport';

type FormValues = {
  username: string;
  password: string;
};

type Props = {
  onSubmit: (values: { username: string; password: string }) => void;
};

function Input(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);

  return (
    <div>
      <TextField margin="normal" fullWidth {...field} label={props.name} />
    </div>
  );
}

export default function LoginForm({ onSubmit }: Props) {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ padding: 4, mt: 3 }} elevation={2}>
        <Stack direction="row">
          <BugReport color="primary" fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ lineHeight: '1.8' }}>
            Sign In
          </Typography>
        </Stack>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, width: 320 }}
        >
          <Input control={control} name="username" rules={{ required: true }} />
          <Input control={control} name="password" rules={{ required: true }} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item width="100%">
              <Alert variant="outlined" severity="info">
                <AlertTitle>Demo Credentials</AlertTitle>
                <strong>Username:</strong> username123 <br />
                <strong>Password: </strong> password123
              </Alert>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
