import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RolesTypes} from "state/roles/types";
import {updateRoleEndpoint} from 'state/roles/endpoints';
import {updateRoleAction} from 'state/roles/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateRoleAction,
}
const updateRole = createLogic({
    type: RolesTypes.UPDATE_ROLE,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateRoleEndpoint(action.payload.id);
        const {name, permissions} = action.payload;

        try {
            await httpClient.put(url, {name, permissions});
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateRole;
