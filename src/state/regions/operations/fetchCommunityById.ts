import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {fetchCommunityByIdEndpoint} from 'state/regions/endpoints';
import {fetchCommunityByIdRequestAction, fetchCommunityByIdSuccess} from 'state/regions/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchCommunityByIdRequestAction,
}

const fetchCommunityById = createLogic({
    type: RegionsTypes.FETCH_COMMUNITY_BY_ID_REQUEST,
    latest: true,

    async process({action, httpClient}: IDependencies, dispatch, done) {
        const {url} = fetchCommunityByIdEndpoint(action.payload);

        try {
            const {data: {data}} = await httpClient.get(url);
            dispatch(fetchCommunityByIdSuccess(data));

        } catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchCommunityById;