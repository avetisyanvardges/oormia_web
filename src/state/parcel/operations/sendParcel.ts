import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {sendParcelRequestAction, fetchParcelRequest} from "../actions";
import {ParcelTypes} from "../types";
import {sendParcelEndpoint} from "../endpoints";

interface IDependencies {
    httpClient: AxiosInstance,
    action: sendParcelRequestAction,
}
const sendParcel = createLogic({
    type: ParcelTypes.SEND_PARCEL_REQUEST,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = sendParcelEndpoint(payload.id);

        try {
            await httpClient.post(url);
            dispatch(fetchParcelRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default sendParcel;
