import {ICommunity} from "state/regions/types";
import {IMeta} from "state/types";

export enum CustomersActionTypes {
    FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST',
    FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS',
    FETCH_CUSTOMER_BY_UPDATE_REQUEST = 'FETCH_CUSTOMER_BY_UPDATE_REQUEST',
    FETCH_CUSTOMER_BY_UPDATE_SUCCESS = 'FETCH_CUSTOMER_BY_UPDATE_SUCCESS',
    CREATE_CUSTOMER = 'CREATE_CUSTOMER',
    UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
    DELETE_CUSTOMER = 'DELETE_CUSTOMER',
}

export interface ICustomers {
    id?: number,
    first_name?: string,
    last_name?: string,
    phone?: string,
    region?: {
        id: number,
        region: string,
    }
    community?: ICommunity,
    address?: string,
    is_company?: boolean,
    sender_courier?: any,
    recipient_courier?: any,
}

export interface ICreateAndUpdateCustomerPayload {
    params(params: any): { type: import("../balance/types").BalanceActionTypes; payload: any; };
    values(url: string, values: any): unknown;
    first_name: string,
    last_name: string,
    phone: string,
    region_id: string,
    community_id: string,
    address: string,
    is_company: string
}

export interface IInitialState {
    customers: ICustomers[],
    customersMeta: IMeta,
    customerByUpdate: ICustomers,
}