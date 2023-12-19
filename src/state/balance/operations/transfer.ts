import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {createCustomerAction} from 'state/customers/actions';
import history from 'utils/browserHistory';
import {transferEndpoint} from "../endpoints";
import {BalanceActionTypes} from "../types";
import {fetchBalanceHistoryRequest} from '../actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: createCustomerAction,
}
const transfer = createLogic({
    type: BalanceActionTypes.TRANSFER_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = transferEndpoint;

        try {
            await httpClient.post(url, action.payload?.values);
            dispatch(fetchBalanceHistoryRequest(action.payload?.params))
            // history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default transfer;
