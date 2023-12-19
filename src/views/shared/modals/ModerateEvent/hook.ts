import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import receivedValidationSchema from "lib/yupLocalised/scheme/received";
import acceptedValidationSchema from "lib/yupLocalised/scheme/accepted";
import {acceptOrderRequest, fetchPickupOrdersRequest, receivedOrderRequest} from 'state/orders/actions';
import {IParams} from 'state/types';
import {acceptEventRequest} from "../../../../state/events/actions";

interface Props {
    event: any,
    onClose: any
}


function useContainer({event,onClose}: Props) {
    const dispatch = useDispatch();


    const onSubmit = () => {
        onClose();
       dispatch(acceptEventRequest({id: event.id}))
    }



    return {
        onSubmit,
        loading: false,
    }
}

export default useContainer;
