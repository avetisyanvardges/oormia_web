import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {fetchRegionByIdEndpoint} from 'state/regions/endpoints';
import {fetchRegionByIdRequestAction, fetchRegionByIdSuccess} from 'state/regions/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRegionByIdRequestAction,
}

const fetchRegionById = createLogic({
    type: RegionsTypes.FETCH_REGION_BY_ID_REQUEST,
    latest: true,

    async process({action, httpClient}: IDependencies, dispatch, done) {
        const {url} = fetchRegionByIdEndpoint(action.payload);

        try {
            const {data: {data}} = await httpClient.get(url);
            dispatch(fetchRegionByIdSuccess(data));

        } catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchRegionById;