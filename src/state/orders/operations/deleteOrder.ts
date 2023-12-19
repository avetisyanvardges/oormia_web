import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {OrderTypes} from "../types";
import {deleteOrderAction, fetchOrdersRequest} from "../actions";
import {deleteOrderEndpoint} from "../endpoints";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteOrderAction,
}
const deleteOrder = createLogic({
    type: OrderTypes.DELETE_ORDER,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteOrderEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchOrdersRequest(payload.params));
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteOrder;
