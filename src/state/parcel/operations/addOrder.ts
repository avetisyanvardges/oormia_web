import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {ParcelTypes} from "../types";
import {addOrderEndpoint} from "../endpoints";
import {fetchOrdersRequest} from "../../orders/actions";
import {fetchParcelByIdRequest} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: any,
}
const addOrder = createLogic({
    type: ParcelTypes.ADD_ORDER_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = addOrderEndpoint(action.payload.id);

        try {
            await httpClient.post(url, {orders: action.payload.tracking_code});
            if(action.payload.params) dispatch(fetchOrdersRequest(action.payload.params))
            dispatch(fetchOrdersRequest(action.payload.params))
            dispatch(fetchParcelByIdRequest(action.payload.id))

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default addOrder;
