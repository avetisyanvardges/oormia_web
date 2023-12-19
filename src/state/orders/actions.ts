import {IFetchOrdersSuccessPayload, IOrderTypes, OrderTypes,} from "state/orders/types";
import {ActionWithPayload, IParams, IRoleById} from "state/types";

export type fetchOrdersRequestAction = ActionWithPayload<OrderTypes.FETCH_ORDERS_REQUEST, IParams>;
export type fetchOrdersSuccessAction = ActionWithPayload<OrderTypes.FETCH_ORDERS_SUCCESS, IFetchOrdersSuccessPayload>;
export type createOrderAction = ActionWithPayload<OrderTypes.CREATE_ORDER, {order: IOrderTypes} & {params: IParams}>;
export type updateOrderAction = ActionWithPayload<OrderTypes.UPDATE_ORDER, {order: IOrderTypes} & {params: IParams}>;
export type deleteOrderAction = ActionWithPayload<OrderTypes.DELETE_ORDER, {id: string} & {params: IParams}>;
export type orderAcceptedRequestAction = ActionWithPayload<OrderTypes.ACCEPT_ORDER_REQUEST, any>;
export type orderReceivedRequestAction = ActionWithPayload<OrderTypes.RECEIVE_ORDER_REQUEST, any>;
export type orderConfirmRequestAction = ActionWithPayload<OrderTypes.CONFIRM_ORDER, any>;
export type orderRejectRequestAction = ActionWithPayload<OrderTypes.REJECT_ORDER, any>;

export const confirmOrderRequest = (data: any) => ({
    type: OrderTypes.CONFIRM_ORDER,
    payload: data,
});

export const rejectOrderRequest = (data: any) => ({
    type: OrderTypes.REJECT_ORDER,
    payload: data,
});

export const fetchOrdersRequest = (params: any) => ({
    type: OrderTypes.FETCH_ORDERS_REQUEST,
    payload: params,
});

export const fetchOrdersSuccess = (data: IFetchOrdersSuccessPayload) => ({
    type: OrderTypes.FETCH_ORDERS_SUCCESS,
    payload: data,
});
export const acceptOrderRequest = (data: any) => ({
    type: OrderTypes.ACCEPT_ORDER_REQUEST,
    payload: data,
});

export const receivedOrderRequest = (data: any) => ({
    type: OrderTypes.RECEIVE_ORDER_REQUEST,
    payload: data,
});

export const sortOrderRequest = (data: any) => ({
    type: OrderTypes.SORT_ORDERS_REQUEST,
    payload: data,
});

export const fetchPickupOrdersRequest = (params: IParams) => ({
    type: OrderTypes.FETCH_PICKUP_ORDERS_REQUEST,
    payload: params,
});

export const fetchPickupOrdersSuccess = (data: IFetchOrdersSuccessPayload) => ({
    type: OrderTypes.FETCH_PICKUP_ORDERS_SUCCESS,
    payload: data,
});

export const fetchDeliveryOrdersRequest = (params: IParams) => ({
    type: OrderTypes.FETCH_DELIVERY_ORDERS_REQUEST,
    payload: params,
});

export const fetchDeliveryOrdersSuccess = (data: IFetchOrdersSuccessPayload) => ({
    type: OrderTypes.FETCH_DELIVERY_ORDERS_SUCCESS,
    payload: data,
});


export const createOrder = (data: IOrderTypes) => ({
    type: OrderTypes.CREATE_ORDER,
    payload: data,
});

export const updateOrder = (data: {order: IOrderTypes, id: string} & {params: IParams}) => ({
    type: OrderTypes.UPDATE_ORDER,
    payload: data,
});

export const deleteOrder = (data: {params: any, id: string}) => ({
    type: OrderTypes.DELETE_ORDER,
    payload: data,
});

export const fetchOrderByIdRequest = (id: string) => ({
    type: OrderTypes.FETCH_ORDER_BY_ID_REQUEST,
    payload: id,
});

export const fetchOrderByIdSuccess = (data: IRoleById) => ({
    type: OrderTypes.FETCH_ORDER_BY_ID_SUCCESS,
    payload: data,
});

export type OrderActionTypes = fetchOrdersSuccessAction | any;
