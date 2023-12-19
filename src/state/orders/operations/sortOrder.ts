import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {OrderTypes} from "../types";
import {fetchPickupOrdersRequest} from "../actions";
import {sortOrderEndpoint} from "../endpoints";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: any,
}
const sortOrder = createLogic({
    type: OrderTypes.SORT_ORDERS_REQUEST,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = sortOrderEndpoint

        try {
            await httpClient.post(url, {orders: payload.orders});
            dispatch(fetchPickupOrdersRequest(payload.params))
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default sortOrder;
