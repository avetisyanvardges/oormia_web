import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {AdminActionTypes} from "state/admins/types";
import {updateUsersEndpoint} from 'state/admins/endpoints';
import {updateUserAction} from 'state/admins/actions';
import history from 'utils/browserHistory';

interface IDependencies {
    httpClient: AxiosInstance,
    action: updateUserAction,
}
const updateUser = createLogic({
    type: AdminActionTypes.UPDATE_USER,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = updateUsersEndpoint(action.payload.id);

        try {
            await httpClient.put(url, action.payload.user);
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default updateUser;
