import {IMeta} from "state/types";

export enum WarehousesActionTypes {
    FETCH_WAREHOUSES_REQUEST = 'FETCH_WAREHOUSES_REQUEST',
    FETCH_WAREHOUSES_SUCCESS = 'FETCH_WAREHOUSES_SUCCESS',
    FETCH_WAREHOUSE_REQUEST = 'FETCH_WAREHOUSE_REQUEST',
    SET_TO_WAREHOUSE = 'SET_TO_WAREHOUSE',
    SET_TO_COURIER = 'SET_TO_COURIER',
    FETCH_WAREHOUSE_SUCCESS = 'FETCH_WAREHOUSE_SUCCESS',
    FETCH_WAREHOUSE_BY_UPDATE_REQUEST = 'FETCH_WAREHOUSE_BY_UPDATE_REQUEST',
    FETCH_WAREHOUSE_BY_UPDATE_SUCCESS = 'FETCH_WAREHOUSE_BY_UPDATE_SUCCESS',
    CREATE_WAREHOUSE = 'CREATE_WAREHOUSE',
    UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE',
    DELETE_WAREHOUSE = 'DELETE_WAREHOUSE',
}

export interface IWarehouse {
    id?: number,
    warehouse_en?: string,
    warehouse_am?: string,
    warehouse_ru?: string,
    open_at?: string,
    close_at?: string,
    code?: string,
    address?: string,
    latitude?: number | null,
    longitude?: number | null,
    region_id?: string,
}

export interface ICreateAndUpdateWarehouses {
    warehouse_am: string,
    warehouse_ru: string,
    warehouse_en: string,
    open_at: string,
    close_at: string,
    address: string,
    code: string,
    region_id: string
}

export interface IInitialState {
    warehouses: IWarehouse[],
    warehousesMeta: IMeta,
    warehousesByUpdate: IWarehouse,
}
