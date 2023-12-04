import { Input, FormLabel, Stack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

type x = {
    control: any;
    name: string;
    label?: string;
    error?: any;
    value?: string;
};

const PhoneInput = ({ value, control, name, label, error, ...rest }: x) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <Stack>
                    <FormLabel position="absolute" mt="3.5" fontWeight="normal">
                        {label}
                    </FormLabel>

                    <Input
                        w="200"
                        mt="45px"
                        isRequired
                        focusBorderColor="facebook.100"
                        {...field}
                        type="tel"
                        {...rest}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const numericValue = rawValue.replace(/\D/g, '');

                            if (numericValue.length === 9) {
                                const formattedValue = `${numericValue.substring(0, 5)}-${numericValue.substring(5)}`;
                                field.onChange(formattedValue);
                            } else {
                                field.onChange(numericValue);
                            }

                            field.value = { value }
                        }}
                    />
                </Stack>
            )}
        />
    );
};

export default PhoneInput;
