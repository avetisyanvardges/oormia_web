import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {RolesTypes} from "state/roles/types";
import {createRoleEndpoint} from 'state/roles/endpoints';
import {createRoleAction} from 'state/roles/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: createRoleAction,
}
const createRole = createLogic({
    type: RolesTypes.CREATE_ROLE,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createRoleEndpoint;

        try {
            await httpClient.post(url, action.payload);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createRole;
