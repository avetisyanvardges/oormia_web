import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RolesTypes} from "state/roles/types";
import {deleteRoleEndpoint} from 'state/roles/endpoints';
import {deleteRoleAction, fetchRolesRequest} from 'state/roles/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteRoleAction,
}
const deleteRole = createLogic({
    type: RolesTypes.DELETE_ROLE,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteRoleEndpoint(payload.id);

        try {
            await httpClient.delete(url);
            dispatch(fetchRolesRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteRole;
