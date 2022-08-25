/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { useForm, useController, UseControllerProps } from 'react-hook-form';
import { Typography, TextField, Button, Box } from '@mui/material';

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
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
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Input control={control} name="username" rules={{ required: true }} />
        <Input control={control} name="password" rules={{ required: true }} />
        <Input control={control} name="confirmPassword" rules={{ required: true }} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Register
        </Button>
      </Box>
    </Box>
  );
}
