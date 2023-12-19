import {useCallback, useState} from "react";
import {useField} from "formik";
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';

function useContainer({ name, items, formikPermissions }: {name: string, items: any[], formikPermissions: any}) {
    const [checkAll, setCheckAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);
    const [field, , helpers] = useField(name);
    const {setValue} = helpers;

    /** Handle change */
    const onChangeHandler = useCallback((value: CheckboxValueType[]) => {
        const result = value.reduce((acc: any, item: any) => {
            acc[String(item)] = item;
            return acc;
        }, {});
        setValue(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue]);

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        let allValues = Object.values(items).reduce((acc: any, arr: { label: string, value: number }[]) => {
            arr.forEach((item) => {
                acc[item.value] = item.value;
            });
            return acc;
        }, {});
        setValue(e.target.checked ? allValues : {});
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const getDisabledValue = (arg: any) => {
        let result = true;
        if(!formikPermissions?.[arg[0]?.value] && !formikPermissions?.[arg[1]?.value]) {
            arg.slice(2).forEach((item: any) => {
                delete field.value?.[item.value]
            })
        } else {
            result = false;
        }
        return result;
    }

    return {
        field,
        onChangeHandler,
        checkAll,
        indeterminate,
        getDisabledValue,
        onCheckAllChange,
    };
}

export default useContainer;
