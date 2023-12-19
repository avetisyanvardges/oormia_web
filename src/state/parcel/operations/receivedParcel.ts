import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchParcelRequest, sendParcelRequestAction} from "../actions";
import {ParcelTypes} from "../types";
import {receivedParcelEndpoint} from "../endpoints";

interface IDependencies {
    httpClient: AxiosInstance,
    action: sendParcelRequestAction,
}
const receivedParcel = createLogic({
    type: ParcelTypes.RECEIVED_PARCEL_REQUEST,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = receivedParcelEndpoint(payload.id);

        try {
            await httpClient.post(url);
            dispatch(fetchParcelRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default receivedParcel;
