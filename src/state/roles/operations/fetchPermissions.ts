import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RolesTypes} from "state/roles/types";
import {fetchPermissionsEndpoint} from 'state/roles/endpoints';
import {fetchPermissionsRequestAction, fetchPermissionsSuccess} from 'state/roles/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchPermissionsRequestAction,
}

const fetchPermissions = createLogic({
    type: RolesTypes.FETCH_PERMISSIONS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchPermissionsEndpoint;

        try {
            const {data: { data }} = await httpClient.get(url);
            dispatch(fetchPermissionsSuccess(data.data));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchPermissions;
