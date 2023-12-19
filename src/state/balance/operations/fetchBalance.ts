import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchCustomersRequestAction} from 'state/customers/actions';
import {BalanceActionTypes} from "../types";
import {fetchBalanceHistorySuccess} from "../actions";
import {fetchBalanceEndpoint} from "../endpoints";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchCustomersRequestAction,
}

const fetchBalance = createLogic({
    type: BalanceActionTypes.GET_BALANCE_HISTORY_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchBalanceEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchBalanceHistorySuccess({ meta: metaData, balance: data.data }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchBalance;
