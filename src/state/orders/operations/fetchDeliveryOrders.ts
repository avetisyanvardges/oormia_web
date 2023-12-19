import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchRegionsRequestAction} from 'state/regions/actions';
import {fetchDeliveryOrdersEndpoint} from "../endpoints";
import {OrderTypes} from "../types";
import {fetchDeliveryOrdersSuccess} from "../actions";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRegionsRequestAction,
}

const fetchDeliveryOrders = createLogic({
    type: OrderTypes.FETCH_DELIVERY_ORDERS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchDeliveryOrdersEndpoint;
        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchDeliveryOrdersSuccess({ meta: metaData, orders: data.data    }));
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchDeliveryOrders;
