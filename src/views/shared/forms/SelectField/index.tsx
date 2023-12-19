import React, {FC} from 'react';
import { Form, Select } from 'antd';
import {useField} from 'formik';
import SelectOption from './SelectOption';

interface IFormField {
    label?: string,
    name: string,
    placeholder?: string,
    formItemClassName?: string,
    props?: any,
    className?: any,
    labelClassName?: string,
    options?: any,
    allowClear?: boolean,
    optionComponent?: any,
}

const SelectField: FC<IFormField> = ({
                         label,
                         name,
                         formItemClassName,
                         placeholder,
                         options,
                         allowClear,
                         optionComponent: Option,
                         labelClassName,
                         ...props
                     }) => {
    const [field, meta, helpers] = useField(name);
    // const hasError: any = meta.error;
    const hasError: any = meta.touched && meta.error;
    const Error = hasError ? <div className="error" style={{color: 'red'}}>{meta.error}</div> : undefined;
    const { setValue } = helpers;

    const onChangeHandler = (value: any) => {
        setValue(value);
    };

    return (
        <Form.Item
            className={formItemClassName}
            label={<span className={labelClassName}>{label}</span>}
            htmlFor={name}
            validateStatus={hasError && 'error'}
            help={Error}
        >
            <Select
                {...props}
                id={name}
                allowClear={allowClear}
                value={field.value}
                onChange={onChangeHandler}
                placeholder={placeholder}
            >
                {options.map(Option)}
            </Select>
        </Form.Item>
    );
};

SelectField.defaultProps = {
    formItemClassName: undefined,
    label: undefined,
    placeholder: undefined,
    options: [],
    optionComponent: SelectOption,
    allowClear: true,
};

export default SelectField;
