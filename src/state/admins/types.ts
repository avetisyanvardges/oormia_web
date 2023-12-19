import {IMeta, IRole} from "state/types";

export enum AdminActionTypes {
    SIGN_IN_REQUEST = 'SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST',
    FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS',
    FETCH_COURIER_REQUEST = 'FETCH_COURIER_REQUEST',
    FETCH_COURIER_SUCCESS = 'FETCH_COURIER_SUCCESS',
    FETCH_USER_BY_UPDATE_REQUEST = 'FETCH_USER_BY_UPDATE_REQUEST',
    FETCH_USER_BY_UPDATE_SUCCESS = 'FETCH_USER_BY_UPDATE_SUCCESS',
    CREATE_USER = 'CREATE_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',
}

export interface ICurrentAdmin {
    id?: string,
    balance?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    address?: string,
    code?: string,
    email?: string,
    pictures?: string,
    is_company?: boolean,
    key?: number,
    role?: IRole[],
    permissions?: string[],
    region?: { id: number, region: string }
    community?: { id: number, community: string }
}

export interface IInitialState {
    currentAdmin: any,
    users: ICurrentAdmin[],
    usersMeta: IMeta,
    userByUpdate: ICurrentAdmin,
}

export interface ISignInRequestPayload {
    email: string,
    password: string
}

export interface ICreateAndUpdateUserPayload {
    role_id: string,
    first_name: string,
    last_name: string,
    phone: string,
    region_id: string,
    community_id: string,
    address: string,
}
