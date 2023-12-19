import React, {FC} from "react";
import {DatePicker, Form} from 'antd';
import {useField} from "formik";
import moment from 'moment';

interface IFormField {
    label?: string,
    name: string,
    placeholder?: string,
    formItemClassName?: string,
    asComponent?: any,
    props?: any,
    className?: any,
    bordered?: boolean,
    labelClassName?: string,
    format?: string,
}

const defaultProps: IFormField = {
    label: '',
    name: '',
    placeholder: '',
    formItemClassName: '',
    bordered: true,
    asComponent: DatePicker,
    labelClassName: '',
    format: 'MMMM Do YYYY'
}

const DateField: FC<IFormField> =
    ({
         label,
         name,
         placeholder,
         formItemClassName,
         labelClassName,
         asComponent: Component,
         format,
         ...props
     }) => {
        const [field, meta, helpers] = useField(name);
        const {setValue} = helpers;
        const hasError: any = meta.touched && meta.error;
        const Error = hasError ? <div className="error" style={{color: 'red'}}>{meta.error}</div> : undefined;
        const onChangeHandler = (dateString: string) => setValue(dateString);
        return (
            <Form.Item
                className={formItemClassName}
                label={<span className={labelClassName}>{label}</span>}
                htmlFor={name}
                validateStatus={hasError}
                help={Error}
            >
                <Component
                    id={name}
                    placeholder={placeholder}
                    {...field} {...props}
                    value={field.value ? (moment(field.value, format)) : ''}
                    onChange={((e: any) => onChangeHandler(e ? moment(e).format(format) : ''))}
                />
            </Form.Item>
        );
    };

DateField.defaultProps = defaultProps;

export default DateField;
