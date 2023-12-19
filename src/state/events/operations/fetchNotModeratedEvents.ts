import {AxiosInstance} from 'axios';
import {createLogic} from 'redux-logic';
import {fetchNotModeratedEventsEndpoint} from "../endpoints";
import {EventTypes} from "../types";
import {fetchNotModeratedRequest, fetchNotModeratedSuccess, orderReceivedRequestAction} from "../actions";

interface IDependencies {
    httpClient: AxiosInstance,
    action: orderReceivedRequestAction,
}

const fetchNotModeratedEvents = createLogic({
    type: EventTypes.FETCH_NOT_MODERATED_EVENTS_REQUEST,
    latest: true,

    async process({ action, httpClient }: IDependencies, dispatch, done) {
        const { url } = fetchNotModeratedEventsEndpoint;

        try {
            const {data} = await httpClient.get(url);
            console.log(data,"DATA")
            dispatch(fetchNotModeratedSuccess(data));

        }catch {
            // take in httpClient
        }
        done();
    },
});

export default fetchNotModeratedEvents;
