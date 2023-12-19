import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {AdminActionTypes} from "state/admins/types";
import {fetchCouriersEndpoint} from 'state/admins/endpoints';
import {fetchCouriersRequestAction, fetchCouriersSuccess} from 'state/admins/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchCouriersRequestAction,
}

const fetchCourier = createLogic({
    type: AdminActionTypes.FETCH_COURIER_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchCouriersEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchCouriersSuccess({ meta: metaData, users: data.data }))

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchCourier;
