import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import history from 'utils/browserHistory';
import {ParcelTypes} from "../types";
import {updateParcelAction} from "../actions";
import {updateParcelEndpoint} from "../endpoints";

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateParcelAction,
}
const updateParcel = createLogic({
    type: ParcelTypes.UPDATE_PARCEL,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateParcelEndpoint(action.payload.id);

        try {
            await httpClient.put(url, {...action.payload});
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateParcel;
