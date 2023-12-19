import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {AdminActionTypes} from "state/admins/types";
import {deleteUserEndpoint} from 'state/admins/endpoints';
import {deleteUserAction, fetchUsersRequest} from 'state/admins/actions';

interface IDependencies {
    httpClient: AxiosInstance,
    action: deleteUserAction,
}
const deleteUser = createLogic({
    type: AdminActionTypes.DELETE_USER,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = deleteUserEndpoint(String(payload.id));

        try {
            await httpClient.delete(url);
            dispatch(fetchUsersRequest(payload.params));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default deleteUser;
