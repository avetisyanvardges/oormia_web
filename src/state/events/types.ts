import {IMeta} from "state/types";
import {ICurrentAdmin} from "../admins/types";

export enum EventTypes {
    FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST',
    FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
    FETCH_NOT_MODERATED_EVENTS_REQUEST = 'FETCH_NOT_MODERATED_EVENTS_REQUEST',
    FETCH_NOT_MODERATED_EVENTS_SUCCESS = 'FETCH_NOT_MODERATED_EVENTS_SUCCESS',

    CREATE_ORDER = 'CREATE_ORDER',
    UPDATE_ORDER = 'UPDATE_ORDER',
    DELETE_ORDER = 'DELETE_ORDER',
    CONFIRM_EVENT_REQUEST = 'CONFIRM_EVENT_REQUEST',
    REJECT_EVENT_REQUEST = 'REJECT_EVENT_REQUEST',
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

