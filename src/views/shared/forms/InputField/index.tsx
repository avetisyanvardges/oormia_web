import React, {FC} from "react";
import {Form, Input} from 'antd';
import {useField} from "formik";

interface IFormField {
    label?: string,
    name: string,
    placeholder?: string,
    formItemClassName?: string,
    asComponent?: any,
    props?: any,
    className?: any,
    type?: string,
    bordered?: boolean,
    prefix?: any,
    labelClassName?: string,
    autoComplete?: string,
}

const defaultProps: IFormField = {
    label: '',
    name: '',
    placeholder: '',
    formItemClassName: '',
    bordered: true,
    asComponent: Input,
    labelClassName: '',
    autoComplete: '',
}

const InputFiled: FC<IFormField> = ({
                                        label,
                                        name,
                                        placeholder,
                                        formItemClassName,
                                        labelClassName,
                                        asComponent: Component,
                                        ...props
                                    }) => {
    const [field, meta, helpers] = useField(name);
    const hasError: any = meta.touched && meta.error;
    const Error = hasError ? <div className="error" style={{color: 'red'}}>{meta.error}</div> : undefined;
    const { setValue } = helpers;

    const onChangeHandler = (event: any) => setValue(event.target.value);

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
                {...field}
                {...props}
                onChange={onChangeHandler}
            />
        </Form.Item>
    );
};

InputFiled.defaultProps = defaultProps;

export default InputFiled;
