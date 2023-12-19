import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {AdminActionTypes} from "state/admins/types";
import {fetchUsersEndpoint} from 'state/admins/endpoints';
import {fetchUsersRequestAction, fetchUsersSuccess} from 'state/admins/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchUsersRequestAction,
}

const fetchUsers = createLogic({
    type: AdminActionTypes.FETCH_USERS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchUsersEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchUsersSuccess({ meta: metaData, users: data.data }))

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchUsers;
