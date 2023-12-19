import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {OrderTypes} from "../types";
import {fetchOrdersRequest, updateOrderAction} from "../actions";
import {updateOrderEndpoint} from "../endpoints";
import history from "../../../utils/browserHistory";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateOrderAction,
}
const updateOrder = createLogic({
    type: OrderTypes.UPDATE_ORDER,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateOrderEndpoint(String(payload.order.id));

        try {
            await httpClient.put(url, payload.order);
            dispatch(fetchOrdersRequest(payload.params));
            history.back();
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateOrder;
