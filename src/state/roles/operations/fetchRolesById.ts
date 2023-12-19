import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RolesTypes} from "state/roles/types";
import {fetchRolesByIdEndpoint} from 'state/roles/endpoints';
import {fetchRolesByIdRequestAction, fetchRolesByIdSuccess} from 'state/roles/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRolesByIdRequestAction,
}

const fetchRolesById = createLogic({
    type: RolesTypes.FETCH_ROLE_BY_ID_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchRolesByIdEndpoint(action.payload);

        try {
            const {data: { data }} = await httpClient.get(url);
            dispatch(fetchRolesByIdSuccess(data));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchRolesById;
