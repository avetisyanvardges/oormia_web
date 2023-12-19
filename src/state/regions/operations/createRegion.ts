import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {createRegionEndpoint} from 'state/regions/endpoints';
import {createRegionAction, fetchRegionsAllRequest} from 'state/regions/actions';
import {hideModal} from "state/modals/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: createRegionAction,
}
const createRegion = createLogic({
    type: RegionsTypes.CREATE_REGION,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createRegionEndpoint;

        try {
            await httpClient.post(url, action.payload.region);
            dispatch(fetchRegionsAllRequest(action.payload.params));
            dispatch(hideModal());

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createRegion;
