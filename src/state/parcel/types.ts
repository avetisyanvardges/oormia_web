import {IMeta} from "state/types";

export enum ParcelTypes {
    FETCH_PARCELS_REQUEST = 'FETCH_PARCELS_REQUEST',
    FETCH_PARCELS_SUCCESS = 'FETCH_PARCELS_SUCCESS',
    CREATE_PARCEL = 'CREATE_PARCEL',
    CLEAN_PARCEL_REDUCER = 'CLEAN_PARCEL_REDUCER',
    UPDATE_PARCEL = 'UPDATE_PARCEL',
    ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST',
    ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS',
    REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST',
    REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS',
    SEND_PARCEL_REQUEST = 'SEND_PARCEL_REQUEST',
    RECEIVED_PARCEL_REQUEST = 'RECEIVED_PARCEL_REQUEST',
    DELETE_PARCEL = 'DELETE_PARCEL',
    FETCH_PERMISSIONS_REQUEST = 'FETCH_PERMISSIONS_REQUEST',
    FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS',
    FETCH_PARCEL_BY_ID_REQUEST = 'FETCH_PARCEL_BY_ID_REQUEST',
    FETCH_PARCEL_BY_ID_SUCCESS = 'FETCH_PARCEL_BY_ID_SUCCESS',
}

export interface ICreateAndUpdateParcelPayload {
    name?: string,
    courier_id?: number
}

export interface IParcel {
    id: number,
    name: string,
    courier_id: string,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string | null,
    orders?: [],
    status?: 'send' | 'in-process'
}

export interface IParcelState {
    parcel: IParcel[],
    parcelMeta: IMeta,
    parcelById: IParcel,
}


