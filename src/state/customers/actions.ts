import {ActionWithPayload, IMeta, IParams} from "state/types";
import {CustomersActionTypes, ICreateAndUpdateCustomerPayload, ICustomers} from "state/customers/types";

export type fetchCustomersRequestAction = ActionWithPayload<CustomersActionTypes.FETCH_CUSTOMERS_REQUEST, IParams>;
export type fetchCustomersSuccessAction =
    ActionWithPayload<CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS, { meta: IMeta, customers: ICustomers[] }>;
export type fetchCustomerByUpdateRequestAction = ActionWithPayload<CustomersActionTypes.FETCH_CUSTOMER_BY_UPDATE_REQUEST, string>;
export type fetchCustomerByUpdateSuccessAction = ActionWithPayload<CustomersActionTypes.FETCH_CUSTOMER_BY_UPDATE_SUCCESS, ICustomers>;
export type createCustomerAction = ActionWithPayload<CustomersActionTypes.CREATE_CUSTOMER, ICreateAndUpdateCustomerPayload>;
export type updateCustomerAction = ActionWithPayload<CustomersActionTypes.UPDATE_CUSTOMER, {id: string, customer: ICreateAndUpdateCustomerPayload}>;
export type deleteCustomerAction = ActionWithPayload<CustomersActionTypes.DELETE_CUSTOMER, { params: IParams, id: string }>;

export const fetchCustomersRequest = (params: any) => ({
    type: CustomersActionTypes.FETCH_CUSTOMERS_REQUEST,
    payload: params,
});

export const fetchCustomersSuccess = (data: {meta: IMeta, customers: ICustomers[]}) => ({
    type: CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS,
    payload: data,
});

export const fetchCustomerByUpdateRequest = (id: string,callback?: (customer: any) => void) => ({
    type: CustomersActionTypes.FETCH_CUSTOMER_BY_UPDATE_REQUEST,
    payload: {id, callback},
});

export const fetchCustomerByUpdateSuccess = (user: ICustomers) => ({
    type: CustomersActionTypes.FETCH_CUSTOMER_BY_UPDATE_SUCCESS,
    payload: user,
});

export const createCustomer = (customer: ICreateAndUpdateCustomerPayload) => ({
    type: CustomersActionTypes.CREATE_CUSTOMER,
    payload: customer,
});

export const updateCustomer = (data: {id: string, customer: ICreateAndUpdateCustomerPayload}) => ({
    type: CustomersActionTypes.UPDATE_CUSTOMER,
    payload: data,
});

export const deleteCustomer = (data: { params: IParams, id: string }) => ({
    type: CustomersActionTypes.DELETE_CUSTOMER,
    payload: data,
});

export type CustomersActions = fetchCustomersSuccessAction | fetchCustomerByUpdateSuccessAction;
