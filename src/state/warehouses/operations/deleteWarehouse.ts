import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {deleteWarehouseEndpoint} from 'state/warehouses/endpoints';
import {deleteWarehouseAction, fetchWarehousesRequest} from 'state/warehouses/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteWarehouseAction,
}
const deleteWarehouse = createLogic({
    type: WarehousesActionTypes.DELETE_WAREHOUSE,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteWarehouseEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchWarehousesRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteWarehouse;
