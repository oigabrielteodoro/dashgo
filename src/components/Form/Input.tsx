import { forwardRef, ForwardRefRenderFunction } from 'react';

import { FieldErrors } from 'react-hook-form';

import { FormControl, FormLabel, Input as FormInput, InputProps as FormInputProps, FormErrorMessage } from '@chakra-ui/react';

interface InputProps extends FormInputProps {
  name: string;
  label?: string;
  error?: FieldErrors;
}
 
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
 
      <FormInput 
        ref={ref}
        id={name}
        name={name} 
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        {...rest}
      /> 

      {!!error && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}
 
export const Input = forwardRef(InputBase);