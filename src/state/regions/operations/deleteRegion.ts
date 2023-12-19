import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {deleteRegionEndpoint} from 'state/regions/endpoints';
import {deleteRegionAction, fetchRegionsAllRequest} from 'state/regions/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteRegionAction,
}
const deleteRegion = createLogic({
    type: RegionsTypes.DELETE_REGION,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteRegionEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchRegionsAllRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteRegion;
