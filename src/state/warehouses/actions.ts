import {ActionWithPayload, IMeta, IParams} from "state/types";
import {ICreateAndUpdateWarehouses, IWarehouse, WarehousesActionTypes} from "state/warehouses/types";

export type fetchWarehousesRequestAction = ActionWithPayload<WarehousesActionTypes.FETCH_WAREHOUSES_REQUEST, IParams>;
export type fetchWarehousesSuccessAction =
    ActionWithPayload<WarehousesActionTypes.FETCH_WAREHOUSES_SUCCESS, { meta: IMeta, warehouses: IWarehouse[] }>;
export type fetchWarehouseSuccessAction =
    ActionWithPayload<WarehousesActionTypes.FETCH_WAREHOUSE_SUCCESS, { warehouses: IWarehouse[] }>;
export type fetchWarehouseByUpdateRequestAction = ActionWithPayload<WarehousesActionTypes.FETCH_WAREHOUSE_BY_UPDATE_REQUEST, string>;
export type fetchWarehouseByUpdateSuccessAction = ActionWithPayload<WarehousesActionTypes.FETCH_WAREHOUSE_BY_UPDATE_SUCCESS, IWarehouse>;
export type createWarehouseAction = ActionWithPayload<WarehousesActionTypes.CREATE_WAREHOUSE, ICreateAndUpdateWarehouses>;
export type updateWarehouseAction = ActionWithPayload<WarehousesActionTypes.UPDATE_WAREHOUSE, {id: string, warehouse: ICreateAndUpdateWarehouses}>;
export type deleteWarehouseAction = ActionWithPayload<WarehousesActionTypes.DELETE_WAREHOUSE, { params: IParams, id: string }>;

export const fetchWarehousesRequest = (params: any) => ({
    type: WarehousesActionTypes.FETCH_WAREHOUSES_REQUEST,
    payload: params,
});

export const fetchWarehousesSuccess = (data: {meta: IMeta, warehouses: IWarehouse[]}) => ({
    type: WarehousesActionTypes.FETCH_WAREHOUSES_SUCCESS,
    payload: data,
});

export const fetchWarehouseRequest = (params: any) => ({
    type: WarehousesActionTypes.FETCH_WAREHOUSE_REQUEST,
    payload: params,
});

export const fetchWarehouseSuccess = (data: {warehouses: IWarehouse[]}) => ({
    type: WarehousesActionTypes.FETCH_WAREHOUSE_SUCCESS,
    payload: data,
});

export const fetchWarehouseByUpdateRequest = (id: string) => ({
    type: WarehousesActionTypes.FETCH_WAREHOUSE_BY_UPDATE_REQUEST,
    payload: id,
});

export const fetchWarehouseByUpdateSuccess = (warehouse: IWarehouse) => ({
    type: WarehousesActionTypes.FETCH_WAREHOUSE_BY_UPDATE_SUCCESS,
    payload: warehouse,
});

export const createWarehouse = (warehouse: ICreateAndUpdateWarehouses) => ({
    type: WarehousesActionTypes.CREATE_WAREHOUSE,
    payload: warehouse,
});

export const updateWarehouse = (data: {id: string, warehouse: ICreateAndUpdateWarehouses}) => ({
    type: WarehousesActionTypes.UPDATE_WAREHOUSE,
    payload: data,
});

export const deleteWarehouse = (data: { params: IParams, id: string }) => ({
    type: WarehousesActionTypes.DELETE_WAREHOUSE,
    payload: data,
});

export type WarehousesActions = fetchWarehouseSuccessAction | fetchWarehousesSuccessAction | fetchWarehouseByUpdateSuccessAction;
