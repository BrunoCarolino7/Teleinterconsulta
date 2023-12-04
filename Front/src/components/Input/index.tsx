import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    children?: ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error, children, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel mt="4" fontWeight="normal" htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                focusBorderColor="facebook.100"
                BorderColor={!!error ? "red" : "pink"}
                size="md"
                {...rest}
                ref={ref}
            />
            {children}

            {!!error && (
                <FormErrorMessage mt="1" position="absolute" >
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}

export const Input = forwardRef(InputBase);

