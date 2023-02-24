import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import type {
  FormControlProps,
  FormErrorMessageProps,
  FormHelperTextProps,
  FormLabelProps,
} from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

export type WrapperProps = {
  label?: FormLabelProps['children']
  errorText?: FormErrorMessageProps['children']
  helperText?: FormHelperTextProps['children']
  children?: ReactNode
} & Pick<FormControlProps, 'isInvalid' | 'isRequired'>

export const Wrapper: FC<WrapperProps> = ({
  label,
  errorText,
  helperText,
  isInvalid,
  isRequired,
  children,
}) => (
  <FormControl isInvalid={isInvalid} isRequired={isRequired}>
    {label && <FormLabel>{label}</FormLabel>}
    {children}
    {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
