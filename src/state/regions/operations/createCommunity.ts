import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {createCommunityEndpoint} from 'state/regions/endpoints';
import {createCommunityAction} from 'state/regions/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: createCommunityAction,
}
const createCommunity = createLogic({
    type: RegionsTypes.CREATE_COMMUNITY,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createCommunityEndpoint;

        try {
            await httpClient.post(url, action.payload);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createCommunity;
