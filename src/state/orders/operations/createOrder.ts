import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {createRegionAction} from 'state/regions/actions';
import {OrderTypes} from "../types";
import {createOrderEndpoint} from "../endpoints";
import history from "../../../utils/browserHistory";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: createRegionAction,
}
const createOrder = createLogic({
    type: OrderTypes.CREATE_ORDER,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createOrderEndpoint;

        try {
            await httpClient.post(url, action.payload);
            history.back();
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createOrder;
