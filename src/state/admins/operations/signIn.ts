import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import Account from "lib/account";
import history from "utils/browserHistory";
import {AdminActionTypes} from "state/admins/types";
import {signInEndpoint} from 'state/admins/endpoints';
import {fetchCurrentUserRequest, signInRequestAction, signInSuccess} from 'state/admins/actions';
import {IRoleById} from "state/types";
import fetchCurrentUser from "./fetchCurrentUser";

interface IDependencies {
    httpClient: AxiosInstance,
    action: signInRequestAction,
}

const userSignIn = createLogic({
    type: AdminActionTypes.SIGN_IN_REQUEST,
    latest: true,

    async process({ action: { payload }, httpClient }: IDependencies, dispatch, done) {
        const { url } = signInEndpoint;
        const { email, password } = payload;

        try {
            const {data: {token, userResponse}} = await httpClient.post(url, {email, password});

            const userData = {
                ...userResponse,
            };

            Account.setAccessToken(token);
            dispatch(fetchCurrentUserRequest())
            history.replace('/');
            dispatch(signInSuccess(userData));

        }catch {
            // take in httpClient
            history.replace('/auth/sign-in')
        }
        done();
    },
});

export default userSignIn;
