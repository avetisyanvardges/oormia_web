import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {deleteParcelAction, fetchParcelRequest} from "../actions";
import {ParcelTypes} from "../types";
import {deleteParcelEndpoint} from "../endpoints";


interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteParcelAction,
}
const deleteParcel = createLogic({
    type: ParcelTypes.DELETE_PARCEL,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteParcelEndpoint(payload.id);

        try {
            await httpClient.delete(url);
            dispatch(fetchParcelRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteParcel;
