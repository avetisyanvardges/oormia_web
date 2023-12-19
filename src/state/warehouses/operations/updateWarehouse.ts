import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {updateWarehouseEndpoint} from 'state/warehouses/endpoints';
import {updateWarehouseAction} from 'state/warehouses/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateWarehouseAction,
}
const updateWarehouse = createLogic({
    type: WarehousesActionTypes.UPDATE_WAREHOUSE,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateWarehouseEndpoint(action.payload.id);

        try {
            await httpClient.put(url, action.payload.warehouse);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateWarehouse;
