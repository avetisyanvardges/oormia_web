import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {fetchWarehouseByUpdateEndpoint} from 'state/warehouses/endpoints';
import {fetchWarehouseByUpdateRequestAction, fetchWarehouseByUpdateSuccess} from 'state/warehouses/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchWarehouseByUpdateRequestAction,
}

const fetchWarehouseByUpdate = createLogic({
    type: WarehousesActionTypes.FETCH_WAREHOUSE_BY_UPDATE_REQUEST,
    latest: true,

    async process({action, httpClient}: IDependencies, dispatch, done) {
        const {url} = fetchWarehouseByUpdateEndpoint(action.payload);

        try {
            const {data: {data}} = await httpClient.get(url);

            dispatch(fetchWarehouseByUpdateSuccess(data))

        } catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchWarehouseByUpdate;