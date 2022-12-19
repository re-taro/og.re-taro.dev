import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";
import { forwardRef } from "react";

import type { WrapperProps } from "./wrapper";
import { Wrapper } from "./wrapper";

export type InputProps = WrapperProps & ChakraInputProps;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, errorText, helperText, isInvalid, isRequired, ...inputProps },
    ref,
  ) => {
    return (
      <Wrapper
        label={label}
        errorText={errorText}
        helperText={helperText}
        isInvalid={isInvalid}
        isRequired={isRequired}
      >
        <ChakraInput
          ref={ref}
          variant="filled"
          borderRadius={12}
          {...inputProps}
          isRequired={isRequired}
        />
      </Wrapper>
    );
  },
);
