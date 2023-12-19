import {Action, ActionWithPayload, IMeta, IParams, IPermission} from "state/types";
import {ICreateAndUpdateParcelPayload, IParcel, ParcelTypes} from './types';

export type fetchParcelRequestAction = ActionWithPayload<ParcelTypes.FETCH_PARCELS_REQUEST, IParams>;
export type fetchParcelSuccessAction = ActionWithPayload<ParcelTypes.FETCH_PARCELS_SUCCESS, {parcel: IParcel[], meta: IMeta}>;
export type createParcelAction = ActionWithPayload<ParcelTypes.CREATE_PARCEL, ICreateAndUpdateParcelPayload>;
export type updateParcelAction = ActionWithPayload<ParcelTypes.UPDATE_PARCEL, ICreateAndUpdateParcelPayload & {id: string}>;
export type deleteParcelAction = ActionWithPayload<ParcelTypes.DELETE_PARCEL, {id: string} & {params: IParams}>;
export type fetchPermissionsRequestAction = Action<ParcelTypes.FETCH_PERMISSIONS_REQUEST>;
export type fetchPermissionsSuccessAction = ActionWithPayload<ParcelTypes.FETCH_PERMISSIONS_SUCCESS, IPermission[]>;
export type fetchParcelByIdRequestAction = ActionWithPayload<ParcelTypes.FETCH_PARCEL_BY_ID_REQUEST, string>;
export type fetchParcelByIdSuccessAction = ActionWithPayload<ParcelTypes.FETCH_PARCEL_BY_ID_SUCCESS, IParcel>;
export type sendParcelRequestAction = ActionWithPayload<ParcelTypes.SEND_PARCEL_REQUEST, {params: IParams, id: string}>;

export const fetchParcelRequest = (params: IParams) => ({
    type: ParcelTypes.FETCH_PARCELS_REQUEST,
    payload: params,
});

export const fetchParcelSuccess = (data: {parcel: IParcel[], meta: IMeta}) => ({
    type: ParcelTypes.FETCH_PARCELS_SUCCESS,
    payload: data,
});

export const addOrderRequest = (data:{id?:number, tracking_code?: string | Array<any>, params?: any}) => ({
    type: ParcelTypes.ADD_ORDER_REQUEST,
    payload: data,
});
export const addOrderSuccess = (data: any) => ({
    type: ParcelTypes.ADD_ORDER_SUCCESS,
    payload: data,
});

export const removeOrderRequest = (data: {id?:number, tracking_code?:string}) => ({
    type: ParcelTypes.REMOVE_ORDER_REQUEST,
    payload: data,
});

export const removeOrderSuccess = (data: any) => ({
    type: ParcelTypes.REMOVE_ORDER_SUCCESS,
    payload: data,
});

export const sendParcelRequest = (data: {params: IParams, id: string}) => ({
    type: ParcelTypes.SEND_PARCEL_REQUEST,
    payload: data,
});

export const createParcel = (data: ICreateAndUpdateParcelPayload) => ({
    type: ParcelTypes.CREATE_PARCEL,
    payload: data,
});

export const updateParcel = (data: ICreateAndUpdateParcelPayload & {id: string}) => ({
    type: ParcelTypes.UPDATE_PARCEL,
    payload: data,
});

export const deleteParcel = (data: {params: IParams, id: string}) => ({
    type: ParcelTypes.DELETE_PARCEL,
    payload: data,
});

export const fetchPermissionsRequest = () => ({
    type: ParcelTypes.FETCH_PERMISSIONS_REQUEST,
});

export const fetchPermissionsSuccess = (data: IPermission[]) => ({
    type: ParcelTypes.FETCH_PERMISSIONS_SUCCESS,
    payload: data,
});

export const cleanParcelReducer = () => ({
    type: ParcelTypes.CLEAN_PARCEL_REDUCER
})

export const fetchParcelByIdRequest = (id: any) => ({
    type: ParcelTypes.FETCH_PARCEL_BY_ID_REQUEST,
    payload: id,
});

export const fetchParcelByIdSuccess = (data: IParcel) => ({
    type: ParcelTypes.FETCH_PARCEL_BY_ID_SUCCESS,
    payload: data,
});

export type ParcelActionTypes = fetchParcelSuccessAction | fetchParcelByIdSuccessAction | any;
