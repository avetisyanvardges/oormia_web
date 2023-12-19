import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {WarehousesActionTypes} from "state/warehouses/types";
import {fetchWarehouseEndpoint, setToCourierEndpoint, setToWarehouseEndpoint} from 'state/warehouses/endpoints';
import {fetchWarehouseSuccess, fetchWarehousesRequestAction} from 'state/warehouses/actions';
import {fetchOrdersRequest} from "../../orders/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchWarehousesRequestAction | any,
}

const setToCourier = createLogic({
    type: WarehousesActionTypes.SET_TO_COURIER,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = setToCourierEndpoint;

        try {
            const {data: { data }} = await httpClient.post(url, action.payload.body);
            dispatch(fetchOrdersRequest(action.payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default setToCourier;
