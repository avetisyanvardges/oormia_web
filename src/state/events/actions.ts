import {IFetchOrdersSuccessPayload, OrderTypes,} from "state/orders/types";
import {ActionWithPayload} from "state/types";
import {EventTypes} from "./types";

export type fetchOrdersSuccessAction = ActionWithPayload<OrderTypes.FETCH_ORDERS_SUCCESS, IFetchOrdersSuccessPayload>;
export type orderReceivedRequestAction = ActionWithPayload<OrderTypes.RECEIVE_ORDER_REQUEST, any>;


export const fetchOrdersRequest = (params: any) => ({
    type: OrderTypes.FETCH_ORDERS_REQUEST,
    payload: params,
});

export const fetchNotModeratedRequest = (params: any) => ({
    type: EventTypes.FETCH_NOT_MODERATED_EVENTS_REQUEST,
    payload: params,
});

export const fetchNotModeratedSuccess = (data: any) => ({
    type: EventTypes.FETCH_NOT_MODERATED_EVENTS_SUCCESS,
    payload: data,
});

export const acceptEventRequest = (data: any) => ({
    type: EventTypes.CONFIRM_EVENT_REQUEST,
    payload: data,
});


export type OrderActionTypes = fetchOrdersSuccessAction | any;
