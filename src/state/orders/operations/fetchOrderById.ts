import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchRolesByIdRequestAction} from 'state/roles/actions';
import {OrderTypes} from "../types";
import {fetchOrderByIdEndpoint} from "../endpoints";
import {fetchOrderByIdSuccess} from "../actions";
import {fetchCurrentUserRequest} from "../../admins/actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: fetchRolesByIdRequestAction,
}

const fetchOrderById = createLogic({
    type: OrderTypes.FETCH_ORDER_BY_ID_REQUEST,
    latest: true,

    async process({action, httpClient}: IDependencies, dispatch, done) {
        const {url} = fetchOrderByIdEndpoint(action.payload);

        try {
            const {data: {data}} = await httpClient.get(url);
            dispatch(fetchOrderByIdSuccess(data));
            dispatch(fetchCurrentUserRequest())

        } catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchOrderById;
