import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {confirmEventEndpoint, fetchNotModeratedEventsEndpoint} from "../endpoints";
import {EventTypes} from "../types";
import {fetchNotModeratedRequest, fetchNotModeratedSuccess, orderReceivedRequestAction} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderReceivedRequestAction,
}

const acceptEvents = createLogic({
    type: EventTypes.CONFIRM_EVENT_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = confirmEventEndpoint(action.payload.id);

        try {
            const {data} = await httpClient.get(url);
            dispatch(fetchNotModeratedRequest({}));
        }catch {
            // take in httpClient
        }
        done();
    },
});

export default acceptEvents;
