import {Action, ActionWithPayload, IMeta, IParams, IPermission, IRole, IRoleById} from "state/types";
import {ICreateAndUpdateRolePayload, RolesTypes} from './types';

export type fetchRolesRequestAction = ActionWithPayload<RolesTypes.FETCH_ROLES_REQUEST, IParams>;
export type fetchRolesSuccessAction = ActionWithPayload<RolesTypes.FETCH_ROLES_SUCCESS, {roles: IRole[], meta: IMeta}>;
export type createRoleAction = ActionWithPayload<RolesTypes.CREATE_ROLE, ICreateAndUpdateRolePayload>;
export type updateRoleAction = ActionWithPayload<RolesTypes.UPDATE_ROLE, ICreateAndUpdateRolePayload & {id: string}>;
export type deleteRoleAction = ActionWithPayload<RolesTypes.DELETE_ROLE, {id: string} & {params: IParams}>;
export type fetchPermissionsRequestAction = Action<RolesTypes.FETCH_PERMISSIONS_REQUEST>;
export type fetchPermissionsSuccessAction = ActionWithPayload<RolesTypes.FETCH_PERMISSIONS_SUCCESS, IPermission[]>;
export type fetchRolesByIdRequestAction = ActionWithPayload<RolesTypes.FETCH_ROLE_BY_ID_REQUEST, string>;
export type fetchRolesByIdSuccessAction = ActionWithPayload<RolesTypes.FETCH_ROLE_BY_ID_SUCCESS, IRoleById>;

export const fetchRolesRequest = (params: IParams) => ({
    type: RolesTypes.FETCH_ROLES_REQUEST,
    payload: params,
});

export const fetchRolesSuccess = (data: {roles: IRole[], meta: IMeta}) => ({
    type: RolesTypes.FETCH_ROLES_SUCCESS,
    payload: data,
});

export const createRole = (data: ICreateAndUpdateRolePayload) => ({
    type: RolesTypes.CREATE_ROLE,
    payload: data,
});

export const updateRole = (data: ICreateAndUpdateRolePayload & {id: string}) => ({
    type: RolesTypes.UPDATE_ROLE,
    payload: data,
});

export const deleteRole = (data: {params: IParams, id: string}) => ({
    type: RolesTypes.DELETE_ROLE,
    payload: data,
});

export const fetchPermissionsRequest = () => ({
    type: RolesTypes.FETCH_PERMISSIONS_REQUEST,
});

export const fetchPermissionsSuccess = (data: IPermission[]) => ({
    type: RolesTypes.FETCH_PERMISSIONS_SUCCESS,
    payload: data,
});

export const fetchRolesByIdRequest = (id: string) => ({
    type: RolesTypes.FETCH_ROLE_BY_ID_REQUEST,
    payload: id,
});

export const fetchRolesByIdSuccess = (data: IRoleById) => ({
    type: RolesTypes.FETCH_ROLE_BY_ID_SUCCESS,
    payload: data,
});

export type RolesActionTypes = fetchRolesSuccessAction | fetchPermissionsSuccessAction | fetchRolesByIdSuccessAction;
