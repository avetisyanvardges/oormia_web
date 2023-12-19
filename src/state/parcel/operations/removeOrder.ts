import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {ParcelTypes} from "../types";
import {addOrderEndpoint, removeOrderEndpoint} from "../endpoints";
import {fetchParcelByIdRequest} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: any,
}
const removeOrder = createLogic({
    type: ParcelTypes.REMOVE_ORDER_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = removeOrderEndpoint(action.payload.id);

        try {

            await httpClient.post(url, {tracking_code: action.payload.tracking_code});
            dispatch(fetchParcelByIdRequest(action.payload.id))


        }catch {
            // take in httpClient
        }
        done();
    },
});

export default removeOrder;
