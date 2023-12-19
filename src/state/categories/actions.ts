import {IFetchOrdersSuccessPayload, OrderTypes,} from "state/orders/types";
import {ActionWithPayload} from "state/types";
import {CategoryTypes} from "./types";

export type fetchOrdersSuccessAction = ActionWithPayload<OrderTypes.FETCH_ORDERS_SUCCESS, IFetchOrdersSuccessPayload>;
export type orderReceivedRequestAction = ActionWithPayload<OrderTypes.RECEIVE_ORDER_REQUEST, any>;


export const fetchAllCategoriesRequest = (params: any) => ({
    type: CategoryTypes.FETCH_ALL_CATEGORIES_REQUEST,
    payload: params,
});
export const fetchAllCategoriesSuccess = (data: any) => ({
    type: CategoryTypes.FETCH_ALL_CATEGORIES_SUCCESS,
    payload: data,
});

export const addCategoryRequest = (params: any) => ({
    type: CategoryTypes.ADD_CATEGORY_REQUEST,
    payload: params,
});
export const addCategorySuccess = (data: any) => ({
    type: CategoryTypes.ADD_CATEGORY_SUCCESS,
    payload: data,
});

export const deleteCategoryRequest = (params: any) => ({
    type: CategoryTypes.DELETE_CATEGORY_REQUEST,
    payload: params,
});

export const deleteCategorySuccess = (data: any) => ({
    type: CategoryTypes.DELETE_CATEGORY_SUCCESS,
    payload: data,
});






export type OrderActionTypes = fetchOrdersSuccessAction | any;
