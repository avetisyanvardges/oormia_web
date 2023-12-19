import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {acceptOrderEndpoint} from "../endpoints";
import {OrderTypes} from "../types";
import {fetchPickupOrdersRequest, orderAcceptedRequestAction} from "../actions";
import {hideModal} from 'state/modals/actions';
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderAcceptedRequestAction,
}

const acceptOrder = createLogic({
    type: OrderTypes.ACCEPT_ORDER_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = acceptOrderEndpoint;

        try {
            if(action.payload.callback){
                await action.payload.callback();
                await dispatch(hideModal());
                await dispatch(fetchPickupOrdersRequest(action.payload.params));
                return
            }

            await httpClient.post(url, action.payload.formData);
            await dispatch(fetchPickupOrdersRequest(action.payload.params));
            await dispatch(hideModal());
            dispatch(fetchCurrentUserRequest())
            // dispatch(acceptOrderSuccess({ meta: metaData, orders: data.data    }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default acceptOrder;
