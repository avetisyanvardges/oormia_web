import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchRegionsRequestAction} from 'state/regions/actions';
import {fetchOrdersEndpoint} from "../endpoints";
import {OrderTypes} from "../types";
import {fetchOrdersSuccess} from "../actions";
import {isEmpty} from "lodash";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRegionsRequestAction | any,
}

const fetchOrders = createLogic({
    type: OrderTypes.FETCH_ORDERS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchOrdersEndpoint;

        try {
            const {
                page,
                per_page,
                user_id,
                status,
                tracking_code,
                delivery_date,
                archive,
                sender_search,
                recipient_search,
                courier_id,
                delivery_start,
                delivery_end
            } = action.payload;
            const params = {
                page,
                per_page: per_page,
                status: !isEmpty(status) ? status : null,
                tracking_code: !isEmpty(tracking_code) ? tracking_code : null,
                delivery_date: !isEmpty(delivery_date) ? delivery_date : null,
                user_id: !isEmpty(user_id) ? user_id : null,
                archive,
                sender_search,
                recipient_search,
                courier_id,
                delivery_start,
                delivery_end,
            };
            const {data: { data }} = await httpClient.get(url, { params: {...params} });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchOrdersSuccess({ meta: metaData, orders: data.data    }));
            dispatch(fetchCurrentUserRequest())

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchOrders;
