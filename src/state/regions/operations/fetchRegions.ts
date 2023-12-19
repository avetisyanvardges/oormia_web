import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RegionsTypes} from "state/regions/types";
import {fetchRegionsEndpoint} from 'state/regions/endpoints';
import {fetchRegionsRequestAction, fetchRegionsSuccess} from 'state/regions/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRegionsRequestAction,
}

const fetchRegions = createLogic({
    type: RegionsTypes.FETCH_REGIONS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchRegionsEndpoint;

        try {
            const {data: {data}} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchRegionsSuccess({meta:metaData, regions: data.data, }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchRegions;
