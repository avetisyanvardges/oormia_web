import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RolesTypes} from "state/roles/types";
import {fetchRolesEndpoint} from 'state/roles/endpoints';
import {fetchRolesRequestAction, fetchRolesSuccess} from 'state/roles/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRolesRequestAction,
}

const fetchRoles = createLogic({
    type: RolesTypes.FETCH_ROLES_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchRolesEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url, { params: action.payload });
            const metaData = {
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total
            }
            dispatch(fetchRolesSuccess({ meta: metaData, roles: data.data }));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchRoles;
