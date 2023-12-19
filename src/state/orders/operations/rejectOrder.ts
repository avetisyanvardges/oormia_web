import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {OrderTypes} from "../types";
import {orderRejectRequestAction, fetchOrdersRequest} from "../actions";
import {rejectOrderEndpoint} from "../endpoints";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderRejectRequestAction,
}
const rejectOrder = createLogic({
    type: OrderTypes.REJECT_ORDER,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = rejectOrderEndpoint;

        try {
            await httpClient.post(url, payload.data);
            dispatch(fetchOrdersRequest(payload.params));
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default rejectOrder;
