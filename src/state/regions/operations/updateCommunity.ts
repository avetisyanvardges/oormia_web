import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {updateCommunityEndpoint} from 'state/regions/endpoints';
import {updateCommunityAction} from 'state/regions/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateCommunityAction,
}
const updateCommunity = createLogic({
    type: RegionsTypes.UPDATE_COMMUNITY,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateCommunityEndpoint(action.payload.id);

        try {
            await httpClient.put(url, action.payload.community);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateCommunity;
