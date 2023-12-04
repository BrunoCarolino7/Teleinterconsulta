import { ConfigProvider, DatePicker } from "antd";
import { Control, Controller } from "react-hook-form";
import dayjs from 'dayjs'
import { Text } from '@chakra-ui/react'
import ptBR from 'antd/es/locale/pt_BR'

interface DatePickersProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
}

export const Calendario = ({ control, name, placeholder }: DatePickersProps) => {

    const customStyle = {
        width: "300px",
        display: "inline",
        height: "39px",
        marginTop: "30px",
        paddingTop: "8px",
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: "Campo obrigatório" }}
            render={({ field, fieldState }) => {
                return (
                    <ConfigProvider locale={ptBR}>
                        <DatePicker
                            style={customStyle}
                            placeholder={placeholder}
                            // status={fieldState.error ? "error" : undefined}
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            value={field.value && dayjs(field.value)}
                            onChange={(date) => { field.onChange(date && date.valueOf()) }}
                        />
                        {fieldState.error && <Text mt={75} ml={1} fontSize={14} color="red" position="absolute">Preencha o campo</Text>}
                    </ConfigProvider>
                );
            }}
        />
    );
};