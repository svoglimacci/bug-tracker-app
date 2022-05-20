import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button, Stack } from '@chakra-ui/react';
import TextField from './FormField';

type Props = {
  onSubmit: (values: { username: string; password: string }) => void;
};

function LoginForm({ onSubmit }: Props) {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validate={(values: { username: string; password: string }) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.username) {
          errors.name = requiredError;
        }
        if (!values.password) {
          errors.name = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Stack spacing="6">
            <Field label="Username" placeholder="Username" name="username" component={TextField} />
            <Field label="Password" placeholder="Password" name="password" component={TextField} />
          </Stack>
          <Stack pt="12">
            <Button size="lg" colorScheme="blue" type="submit" disabled={!dirty || !isValid}>
              Sign in
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
