import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {CustomersActionTypes} from "state/customers/types";
import {updateCustomerEndpoint} from 'state/customers/endpoints';
import {updateCustomerAction} from 'state/customers/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateCustomerAction,
}
const updateCustomer = createLogic({
    type: CustomersActionTypes.UPDATE_CUSTOMER,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateCustomerEndpoint(action.payload.id);

        try {
            await httpClient.put(url, action.payload.customer);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateCustomer;
