import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import receivedValidationSchema from "lib/yupLocalised/scheme/received";
import acceptedValidationSchema from "lib/yupLocalised/scheme/accepted";
import {acceptOrderRequest, fetchPickupOrdersRequest, receivedOrderRequest} from 'state/orders/actions';
import {IParams} from 'state/types';

interface Props { data: any, params: IParams, title: string,
    callback?: any; }

function useContainer({ data, params, title ,callback}: Props) {
    const dispatch = useDispatch();
    // const { endpoint: createEndpoint } = createRegionEndpoint;
    // const { endpoint: updateEndpoint } = updateRegionEndpoint(String(region?.id));
    // const { isLoading: createLoading } = useParametricSelector(createEndpoint);
    // const { isLoading: updateLoading } = useParametricSelector(updateEndpoint);

    const formData = title === 'Accepted' ? ['sender_received_money', 'sender_paid_money'] :
        ['recipient_received_money', 'recipient_paid_money'];

    const onSubmit = () => {
        if(title === 'Accepted') {
            dispatch(acceptOrderRequest({ formData: formik.values, params, callback }))
        }else {
            dispatch(receivedOrderRequest({ formData: formik.values, params }))
        }
    }

    /**  Formik initialization  */
    const formik = useFormik({
        initialValues: { tracking_code:data.tracking_code, [formData[0]]: JSON.parse(data[formData[0]]),
            [formData[1]]: JSON.parse(data[formData[1]]), cost: JSON.parse(data.cost) },

        validationSchema: title === 'Accepted' ? acceptedValidationSchema : receivedValidationSchema,
        onSubmit,
    });

    return {
        formik,
        formData,
        onSubmit,
        loading: false,
    }
}

export default useContainer;
