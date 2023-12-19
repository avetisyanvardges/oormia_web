import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {OrderTypes} from "../types";
import {orderConfirmRequestAction, fetchOrdersRequest} from "../actions";
import {confirmOrderEndpoint} from "../endpoints";
import {hideModal} from 'state/modals/actions';
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderConfirmRequestAction,
}
const confirmOrder = createLogic({
    type: OrderTypes.CONFIRM_ORDER,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = confirmOrderEndpoint;

        try {
            await httpClient.post(url, payload.data);
            dispatch(fetchOrdersRequest({...payload.params, archive: 0}));
            dispatch(hideModal());
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default confirmOrder;
