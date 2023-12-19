import {useEffect} from "react";
import {useParams} from 'react-router-dom';
import moment from "moment";
import {MenuProps} from "antd";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {STATUS} from "constants/statuses";
import validationSchema from 'lib/yupLocalised/scheme/order';
import useMount from "hooks/useMount";
import useErrorHandler from "hooks/useErrorHandler";
import useTypedSelector from "hooks/useTypedSelector";
import useParametricSelector from "hooks/useParametricSelector";
import {createOrder, fetchOrderByIdRequest, updateOrder} from "state/orders/actions";
import {createOrderEndpoint, fetchOrderByIdEndpoint, updateOrderEndpoint} from "state/orders/endpoints";

function useContainer() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {endpoint: createEndpoint} = createOrderEndpoint;
    const {endpoint: updateEndpoint} = updateOrderEndpoint(id || '');
    const {endpoint: getOrderByIdEndpoint} = fetchOrderByIdEndpoint(id || '');
    // selectors
    const {isLoading: getOrderByIdLoading} = useParametricSelector(getOrderByIdEndpoint);
    const {isLoading: createLoader, error: createError} = useParametricSelector(createEndpoint);
    const {isLoading: updateLoader, error: updateError} = useParametricSelector(updateEndpoint);
    const {currentAdmin} = useTypedSelector(({admins}) => admins);
    const {orderById} = useTypedSelector(({orders}) => orders);

    /**  Change status value  */
    const onChangeStatus: MenuProps['onClick'] = (item:any) => {
        formik.setValues({...formik.values, status: item});
    };

    /**  Change payment type  */
    const onChangePaymentType: MenuProps['onClick'] = ({key}) => {
        formik.setValues({...formik.values, payment_type: key});
    };

    /**  Formik handleSubmit  */
    const onSubmit = (values: any) => {
        if (id) {
            const data: any = {order: values, id}
            dispatch(updateOrder(data));
        } else {
            dispatch(createOrder(values))
        }
    };

    /**  Formik initialization  */
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            user_id: currentAdmin.id,
            sender: {
                first_name: '',
                last_name: '',
                phone: null,
                address: '',
                is_company: 0,
                region_id: '',
                community_id: ''
            },
            recipient: {
                first_name: '',
                last_name: '',
                phone: null,
                address: '',
                is_company: 0,
                region_id: '',
                community_id: '',
            },
            payment_type: '',
            cost: 2000,
            is_return: 0,
            delivery_date: '',
            status: STATUS.IN_PROCESS,
            from_name: '',
            to_name: '',
            from_id: '',
            to_id: '',
            recipient_id: '',
            description: '',
            sender_id: '',
        },
        initialErrors: {},
        validationSchema,
        onSubmit,
    });

    useErrorHandler({errors: {...createError?.error, ...updateError?.error}, formik});

    /** open modal for select region  */
    const onSelectHandler = (id: any, fromTo: any) => {
        if (!id) {
            formik.setValues({
                ...formik.values,
                [`${fromTo}_id`]: '',
                [`${fromTo}_name`]: '',
            })
            return;
        }
        formik.setValues({
            ...formik.values,
            [`${fromTo}_id`]: String(id),
            [`${fromTo}_name`]: String(id),
        })
    };

    /** change return checkbox value  */
    const onChangeIsReturn = ({target: value}: any) => {
        formik.setValues({...formik.values, is_return: value.checked ? 1 : 0})
    }

    /**  On update handler  */
    const onUpdateHandler = () => {
        if (!id) return;
        formik.setValues({
            ...formik.values,
            ...orderById,
            sender: {
                ...orderById.sender,
                region: null, region_id: orderById?.sender?.region?.id, community_id: orderById?.sender?.community?.id,
            },
            recipient: {
                ...orderById.recipient,
                region: null,
                region_id: orderById?.recipient?.region?.id,
                community_id: orderById?.recipient?.community?.id,
            },
            from_name: orderById.from?.warehouse,
            from_id: orderById.from?.id,
            to_name: orderById.to?.warehouse,
            to_id: orderById.to?.id,
            recipient_id: orderById.recipient?.id,
            sender_id: orderById.sender?.id,
            cost: orderById.cost,
            payment_type: orderById?.payment_type,
            recipient_paid_money: orderById.recipient_paid_money,
            recipient_received_money: orderById.recipient_received_money,
            sender_paid_money: orderById.sender_paid_money,
            sender_received_money: orderById.sender_received_money,
            recipient_courier: orderById.recipient_courier,
            sender_courier: orderById.sender_courier,
        });
    };


    /**  On mount handler  */
    const onMountHandler = () => {
        formik.resetForm();
        formik.setFieldValue('delivery_date', moment(new Date()).format('YYYY-MM-DD'))
        if (id) dispatch(fetchOrderByIdRequest(id));
    };

    /**  Lifecycle  */
    useEffect(onUpdateHandler, [orderById]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMount(onMountHandler);


    return {
        getOrderByIdLoading,
        formik,
        onChangeIsReturn,
        onChangeStatus,
        buttonLoader: createLoader || updateLoader,
        orderById,
        onChangePaymentType,
        onSelectHandler,
    };
}

export default useContainer;
