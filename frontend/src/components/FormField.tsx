import React from 'react';
import { Input, Text, FormLabel, FormControl } from '@chakra-ui/react';
import { ErrorMessage, FieldProps } from 'formik';

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

function TextField({ label, field, placeholder }: TextProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder} {...field} />
      <Text>
        <ErrorMessage name={field.name} />
      </Text>
    </FormControl>
  );
}

export default TextField;
