import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {CustomersActionTypes} from "state/customers/types";
import {fetchCustomersEndpoint} from 'state/customers/endpoints';
import {fetchCustomersRequestAction, fetchCustomersSuccess} from 'state/customers/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchCustomersRequestAction,
}

const fetchCustomers = createLogic({
    type: CustomersActionTypes.FETCH_CUSTOMERS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchCustomersEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchCustomersSuccess({ meta: metaData, customers: data.data }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchCustomers;
