import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {fetchWarehousesEndpoint} from 'state/warehouses/endpoints';
import {fetchWarehousesRequestAction, fetchWarehousesSuccess} from 'state/warehouses/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchWarehousesRequestAction,
}

const fetchWarehouses = createLogic({
    type: WarehousesActionTypes.FETCH_WAREHOUSES_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchWarehousesEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchWarehousesSuccess({ meta: metaData, warehouses: data.data }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchWarehouses;
