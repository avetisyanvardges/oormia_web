import {ICommunity} from "state/regions/types";
import {IMeta} from "state/types";

export enum BalanceActionTypes {
    TRANSFER_REQUEST = 'TRANSFER_REQUEST',
    TRANSFER_SUCCESS = 'TRANSFER_SUCCESS',
    GET_BALANCE_HISTORY_REQUEST = 'GET_BALANCE_HISTORY_REQUEST',
    GET_BALANCE_HISTORY_SUCCESS = 'GET_BALANCE_HISTORY_SUCCESS',
    DELETE_BALANCE_REQUEST = 'DELETE_BALANCE_REQUEST',
    DELETE_BALANCE_SUCCESS = 'DELETE_BALANCE_SUCCESS',
}

export interface IBalance {
    cost?: number | string,
    comment?: string,
    from?: number,
    to?: number
}

export interface IInitialState {
    balance: IBalance[],
    balanceMeta: IMeta,
}
