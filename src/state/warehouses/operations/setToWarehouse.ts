import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {fetchWarehouseEndpoint, setToWarehouseEndpoint} from 'state/warehouses/endpoints';
import {fetchWarehouseSuccess, fetchWarehousesRequestAction} from 'state/warehouses/actions';
import {fetchOrdersRequest} from "../../orders/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchWarehousesRequestAction | any,
}

const setToWarehouse = createLogic({
    type: WarehousesActionTypes.SET_TO_WAREHOUSE,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = setToWarehouseEndpoint;

        try {
            const {data: { data }} = await httpClient.post(url, action.payload.body);

            dispatch(fetchOrdersRequest(action.payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default setToWarehouse;
