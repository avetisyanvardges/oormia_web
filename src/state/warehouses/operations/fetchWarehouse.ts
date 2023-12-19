import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {fetchWarehouseEndpoint} from 'state/warehouses/endpoints';
import {fetchWarehouseSuccess, fetchWarehousesRequestAction} from 'state/warehouses/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchWarehousesRequestAction,
}

const fetchWarehouse = createLogic({
    type: WarehousesActionTypes.FETCH_WAREHOUSE_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchWarehouseEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchWarehouseSuccess({ warehouses: data.data }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchWarehouse;
