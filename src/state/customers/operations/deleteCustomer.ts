import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {CustomersActionTypes} from "state/customers/types";
import {deleteCustomerEndpoint} from 'state/customers/endpoints';
import {deleteCustomerAction, fetchCustomersRequest} from 'state/customers/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteCustomerAction,
}
const deleteCustomer = createLogic({
    type: CustomersActionTypes.DELETE_CUSTOMER,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteCustomerEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchCustomersRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteCustomer;
