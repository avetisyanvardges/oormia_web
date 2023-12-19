import {ActionWithPayload} from "state/types";
import {BalanceActionTypes, IBalance} from "./types";

export type transferRequestAction = ActionWithPayload<BalanceActionTypes.TRANSFER_REQUEST, IBalance>;
export type fetchBalanceHistoryRequestAction = ActionWithPayload<BalanceActionTypes.GET_BALANCE_HISTORY_REQUEST, IBalance>;
export type fetchBalanceHistorySuccessAction = ActionWithPayload<BalanceActionTypes.GET_BALANCE_HISTORY_SUCCESS, any>;
export type deleteBalanceRequestAction = ActionWithPayload<BalanceActionTypes.DELETE_BALANCE_REQUEST, {id:string}>;
export type updateCustomerAction = ActionWithPayload<BalanceActionTypes.DELETE_BALANCE_SUCCESS, any>;

export const transferRequest = (data: any) => ({
    type: BalanceActionTypes.TRANSFER_REQUEST,
    payload: data,
});

export const fetchBalanceHistoryRequest = (data?:any) => ({
    type: BalanceActionTypes.GET_BALANCE_HISTORY_REQUEST,
    payload: data,
});

export const fetchBalanceHistorySuccess = (data:any) => ({
    type: BalanceActionTypes.GET_BALANCE_HISTORY_SUCCESS,
    payload: data,
});

export const deleteBalanceRequest = (data: any) => ({
    type: BalanceActionTypes.DELETE_BALANCE_REQUEST,
    payload: data,
});

export const deleteBalanceSuccess = (data: any) => ({
    type: BalanceActionTypes.DELETE_BALANCE_SUCCESS,
    payload: data,
});


export type BalanceActions = transferRequestAction | fetchBalanceHistoryRequestAction | fetchBalanceHistorySuccessAction | deleteBalanceRequestAction | updateCustomerAction;
