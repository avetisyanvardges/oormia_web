import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {createWarehouseEndpoint} from 'state/warehouses/endpoints';
import {createWarehouseAction} from 'state/warehouses/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: createWarehouseAction,
}
const createWarehouse = createLogic({
    type: WarehousesActionTypes.CREATE_WAREHOUSE,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createWarehouseEndpoint;

        try {
            await httpClient.post(url, action.payload);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createWarehouse;
