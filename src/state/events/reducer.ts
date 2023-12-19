import {EventTypes} from "./types";
import {OrderActionTypes} from "./actions";

const ordersInitialState: any = {
    not_moderated_events: []
}

const orders = (state = ordersInitialState, action: OrderActionTypes) => {
    switch (action.type) {
        case EventTypes.FETCH_NOT_MODERATED_EVENTS_SUCCESS:
            return {...state, not_moderated_events: action.payload?.filter((ev:any) => ev.eventType !== 'REQUESTED')};
        default:
            return state;
    }
};

export default orders;
