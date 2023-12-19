import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {deleteCommunityEndpoint} from 'state/regions/endpoints';
import {deleteCommunityAction, fetchCommunitiesRequest} from 'state/regions/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteCommunityAction,
}
const deleteCommunity = createLogic({
    type: RegionsTypes.DELETE_COMMUNITY,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteCommunityEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchCommunitiesRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteCommunity;
