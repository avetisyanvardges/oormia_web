import {useEffect, useMemo} from "react";
import {useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {isEmpty} from "lodash";

import {IPermission} from "state/types";
import {createRole, fetchPermissionsRequest, fetchRolesByIdRequest, updateRole} from "state/roles/actions";
import { createRoleEndpoint, fetchPermissionsEndpoint, fetchRolesByIdEndpoint, updateRoleEndpoint} from "state/roles/endpoints";

import useMount from "hooks/useMount";
import permissionName from "utils/permissionName";
import useTypedSelector from "hooks/useTypedSelector";
import validationSchema from "lib/yupLocalised/scheme/role";
import useParametricSelector from "hooks/useParametricSelector";

interface IOnSubmit {
    name: string,
    permissions: {
        [key: string]: number,
    }
}

function useContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    // endpoints
    const { endpoint: getPermissionEndpoint } = fetchPermissionsEndpoint;
    const { endpoint: createEndpoint } = createRoleEndpoint;
    const { endpoint: updateEndpoint } = updateRoleEndpoint(id || '');
    const { endpoint: getRoleByIdEndpoint } = fetchRolesByIdEndpoint(id || '');
    // selectors
    const { isLoading: getPermissionsLoading } = useParametricSelector(getPermissionEndpoint);
    const { isLoading: getRoleByIdLoading } = useParametricSelector(getRoleByIdEndpoint);
    const { isLoading: createLoader, error: createError } = useParametricSelector(createEndpoint);
    const { isLoading: updateLoader, error: updateError } = useParametricSelector(updateEndpoint);
    const { permissions, roleById } = useTypedSelector(({roles}) => roles);

    /** checkbox group options  */
    const options = useMemo(() => {
        return permissions.reduce((acc: any, item: IPermission) => {
            const [key] = permissionName(item.name).split(' ');
            acc[key] = !isEmpty(acc[key]) ? [...acc[key]] :  [];
            acc[key].push({label: permissionName(item.name), value: item.id});
            return acc;
        }, []);
    }, [permissions]);


    /**  Formik handleSubmit  */
    const onSubmit = (values: IOnSubmit) => {
        const result = {name: values.name, permissions: Object.values(values.permissions)}
        if(id) {
            dispatch(updateRole({...result, id}));
        } else {
            dispatch(createRole(result));
        }
    };

    /**  Formik initialization  */
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            permissions: {},
        },
        validationSchema,
        initialErrors: {
            name: createError?.message || updateError?.message,
        },
        onSubmit,
    });

    /**  On mount handler  */
    const onMountHandler = () => {
        formik.resetForm();
        dispatch(fetchPermissionsRequest());
        if(id) dispatch(fetchRolesByIdRequest(id));
    };

    /**  On update handler  */
    const onUpdateHandler = () => {
        if(!id && isEmpty(roleById.permissions)) return;

        const checkedItems = roleById.permissions.reduce((acc: any, item: IPermission) => {
            acc[item.id] = item.id;
            return acc;
        }, {});

        formik.setValues({
            ...formik.values,
            name: roleById.name,
            permissions: checkedItems,
        })
    };

    /**  Lifecycle  */
    useEffect(onUpdateHandler, [roleById]);
    useMount(onMountHandler);

    return {
        getPermissionsLoading,
        getRoleByIdLoading,
        formik,
        roleById,
        permissions,
        options,
        buttonLoader: createLoader || updateLoader,
    }
}

export default useContainer;
