import {IMeta} from "state/types";
import {ICurrentAdmin} from "../admins/types";

export enum OrderTypes {
    FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST',
    FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
    SORT_ORDERS_REQUEST = 'SORT_ORDERS_REQUEST',
    SORT_ORDERS_SUCCESS = 'SORT_ORDERS_SUCCESS',
    FETCH_PICKUP_ORDERS_REQUEST = 'FETCH_PICKUP_ORDERS_REQUEST',
    FETCH_PICKUP_ORDERS_SUCCESS = 'FETCH_PICKUP_ORDERS_SUCCESS',
    FETCH_DELIVERY_ORDERS_REQUEST = 'FETCH_DELIVERY_ORDERS_REQUEST',
    FETCH_DELIVERY_ORDERS_SUCCESS = 'FETCH_DELIVERY_ORDERS_SUCCESS',
    ACCEPT_ORDER_REQUEST = 'ACCEPT_ORDER_REQUEST',
    RECEIVE_ORDER_REQUEST = 'RECEIVE_ORDER_REQUEST',
    FETCH_ORDER_BY_ID_REQUEST = 'FETCH_ORDER_BY_ID_REQUEST',
    FETCH_ORDER_BY_ID_SUCCESS = 'FETCH_ORDER_BY_ID_SUCCESS',
    CREATE_ORDER = 'CREATE_ORDER',
    UPDATE_ORDER = 'UPDATE_ORDER',
    DELETE_ORDER = 'DELETE_ORDER',
    CONFIRM_ORDER = 'CONFIRM_ORDER',
    REJECT_ORDER = 'REJECT_ORDER',
}

export interface ISender {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    address: string,
    is_company: false
}

export interface IRecipient {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    address: string,
    is_company: boolean
}

export interface IOrderTypes {
    id: number,
    user: ICurrentAdmin,
    sender: ISender,
    recipient: IRecipient,
    sender_courier_id: null,
    recipient_courier_id: null,
    from_id: number,
    to_id: number,
    delivery_date: string,
    description: string,
    tracking_code: string,
    is_return: false,
    status: string,
    additional_address: string,
    cost: string | null,
    get_cost: string | null,
    set_cost: string | null,
    comment: string,
    admin_comment: string,
    parcel: any

}

export interface IOrders extends IOrderTypes { id: number }

export interface IFetchOrdersSuccessPayload { meta: IMeta, orders: IOrders[] | any }

export interface IOrdersState {
    ordersMeta: IMeta,
    orders: IOrders[] | any,
    orderById: any,
    courier_orders: IOrders[];
}

