import React from 'react';
import { AutoComplete } from 'antd';

const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
];

const customStyle = {
    width: "300px",

}

export const Autocomplete = () => (
    <AutoComplete
        style={{ width: 200 }}
        options={options}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        defaultOpen={true}
        open={false}
        onSearch={() => setTimeout(() => {

        }, 800)}
    />
);

