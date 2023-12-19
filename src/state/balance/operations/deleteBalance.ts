import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {deleteCustomerAction} from 'state/customers/actions';
import {deleteBalanceEndpoint} from "../endpoints";
import {BalanceActionTypes} from "../types";
import {fetchBalanceHistoryRequest} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteCustomerAction,
}
const deleteBalance = createLogic({
    type: BalanceActionTypes.DELETE_BALANCE_REQUEST,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteBalanceEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchBalanceHistoryRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteBalance;
