import axios, {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {AdminActionTypes} from "state/admins/types";
import {createUserEndpoint, fetchCurrentUserEndpoint} from 'state/admins/endpoints';
import {createUserAction, signInSuccess} from 'state/admins/actions';
import history from 'utils/browserHistory';
import {FETCH_IP_ADDRESS_URL} from 'constants/globals';
import {IRoleById} from "../../types";
import Account from "../../../lib/account";

interface IDependencies {
    httpClient: AxiosInstance,
    action: createUserAction,
}
const fetchCurrentUser = createLogic({
    type: AdminActionTypes.FETCH_CURRENT_USER_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchCurrentUserEndpoint;

        try {
           const {data} =  await httpClient.get(url);
            Account.setAccount(data);
            const userData = {
                ...data,
            };
            dispatch(signInSuccess(userData))
        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchCurrentUser;
