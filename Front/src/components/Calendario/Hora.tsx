import { Controller, Control } from 'react-hook-form';
import { ConfigProvider, TimePicker } from 'antd';
import dayjs from 'dayjs';
import ptBR from 'antd/es/locale/pt_BR'

interface HoraProps {
    control: Control<any>;
}

const customStyle = {
    width: "300px",
    display: "inline",
    height: "39px",
    marginTop: "30px",
    paddingTop: "8px",
}

const Format = "HH:mm"

export function Hora({ control }: HoraProps) {
    return (
        <Controller
            name="selectedTime"
            control={control}
            defaultValue={null}
            render={({ field }) => {
                return (
                    <ConfigProvider locale={ptBR}>
                        <TimePicker
                            style={customStyle}
                            ref={field.ref}
                            defaultValue={dayjs('', Format)}
                            format="HH:mm"
                            value={field.value && dayjs(field.value)}
                            onChange={(date) => { field.onChange(date && date.valueOf()) }}
                        />
                    </ConfigProvider>
                )
            }}
        />
    )
}