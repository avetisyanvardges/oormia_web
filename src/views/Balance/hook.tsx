import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {isEmpty} from "lodash";
import {useFormik} from "formik";
import {transferRequest} from "state/balance/actions";
import {showModal} from "state/modals/actions";
import {transferEndpoint} from "state/balance/endpoints";
import useParametricSelector from "hooks/useParametricSelector";
import useTypedSelector from 'hooks/useTypedSelector';
import useQueryParams from "hooks/useQueryParams";
import useMount from "../../hooks/useMount";
import {fetchCurrentUserRequest} from "../../state/admins/actions";

function useContainer() {
    const { page, params, handleChangeParams } = useQueryParams();
    const {endpoint:createTransferEndpoint} = transferEndpoint;
    const {isLoading, error} = useParametricSelector(createTransferEndpoint);
    const {balance, balanceMeta} = useTypedSelector(({balance}) => balance);
    const dispatch = useDispatch();

    // TODO open modal for select region
    const onSelectUserHandler = (user: any, fromTo: any) => {
        if (isEmpty(user)) {
            formik.setFieldValue(fromTo, '');
            formik.setFieldValue(`${fromTo}_name`, '');
            return;
        }
        formik.setValues({
            ...formik.values,
            [`${fromTo}`]: String(user?.id),
            [`${fromTo}_name`]: String(user?.first_name) + ' ' + String(user?.last_name),
        })
    };

    // TODO open modal for select region
    const openSelectUserModal = (fromTo: any): void => {
        console.log(fromTo, "FROM TO")
        dispatch(showModal({
            modalType: 'SELECT_USER_MODAL',
            modalProps: {
                onSelectHandler:(user:any) => onSelectUserHandler(user, fromTo),
                // @ts-ignore
                selectedUserId: formik.values?.[fromTo]
            }
        }))
    };

    // TODO Formik handleSubmit
    const onSubmit = (values: any) => {
        dispatch(transferRequest({values, params}));
    };

    // TODO  Formik initialization
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cost: 0,
            comment: '',
            from: null,
            to: null,
            from_name: '',
            to_name: ''
        },
        initialErrors: {},
        onSubmit,
    });


    // TODO - handle params update
    const onUpdateTabs = () => {
        // dispatch(fetchBalanceHistoryRequest(params))
    }

    // TODO - Lifecycle
    useEffect(onUpdateTabs, [page]);
    useMount(()=>{
        dispatch(fetchCurrentUserRequest())
    });

    return {
        page,
        params,
        handleChangeParams,
        formik,
        openSelectUserModal,
        balance, balanceMeta,
        buttonLoader: isLoading || error
    }
}

export default useContainer;
