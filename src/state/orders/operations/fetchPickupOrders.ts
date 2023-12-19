import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchRegionsRequestAction} from 'state/regions/actions';
import {fetchPickupOrdersEndpoint} from "../endpoints";
import {OrderTypes} from "../types";
import {fetchPickupOrdersSuccess} from "../actions";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRegionsRequestAction,
}

const fetchPickupOrders = createLogic({
    type: OrderTypes.FETCH_PICKUP_ORDERS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchPickupOrdersEndpoint;
        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchPickupOrdersSuccess({ meta: metaData, orders: data.data    }));
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchPickupOrders;
