import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {CustomersActionTypes} from "state/customers/types";
import {createCustomerEndpoint} from 'state/customers/endpoints';
import {createCustomerAction} from 'state/customers/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: createCustomerAction,
}
const createCustomer = createLogic({
    type: CustomersActionTypes.CREATE_CUSTOMER,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createCustomerEndpoint;

        try {
            await httpClient.post(url, action.payload);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createCustomer;
