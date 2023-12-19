import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import history from 'utils/browserHistory';
import {ParcelTypes} from "../types";
import {createParcelAction} from "../actions";
import {createParcelEndpoint} from "../endpoints";

interface IDependencies {
    httpClient: AxiosInstance,
    action: createParcelAction,
}
const createParcel = createLogic({
    type: ParcelTypes.CREATE_PARCEL,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createParcelEndpoint;

        try {
            await httpClient.post(url, action.payload);
            history.push('/parcels');

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createParcel;
