import axios, {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';

import {AdminActionTypes} from "state/admins/types";
import {createUserEndpoint} from 'state/admins/endpoints';
import {createUserAction} from 'state/admins/actions';
import history from 'utils/browserHistory';
import {FETCH_IP_ADDRESS_URL} from 'constants/globals';

interface IDependencies {
    httpClient: AxiosInstance,
    action: createUserAction,
}
const createUser = createLogic({
    type: AdminActionTypes.CREATE_USER,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = createUserEndpoint;
        const { data: { IPv4 } } = await axios.get(FETCH_IP_ADDRESS_URL);

        try {
            await httpClient.post(url, {...action.payload, create_ip: IPv4});
            history.back();

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default createUser;
