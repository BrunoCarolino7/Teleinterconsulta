import { FormControl, FormLabel, Select as SelectComponent, SelectProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { FieldError } from 'react-hook-form'

interface SelectProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    children?: ReactNode;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({ name, label, error, children, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel mt="4" fontWeight="normal" htmlFor={name}>{label}</FormLabel>}
            <SelectComponent
                name={name}
                id={name}
                focusBorderColor="facebook.100"
                BorderColor={!!error ? "red" : "pink"}
                required
                size="md"
                {...rest}
                ref={ref}
            >
                {children}
            </SelectComponent>
        </FormControl>
    );
}

export const Selects = forwardRef(SelectBase);

