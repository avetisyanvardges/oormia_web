import {CustomersActionTypes, IInitialState} from 'state/customers/types';
import {CustomersActions} from "state/customers/actions";

const initialState: IInitialState = {
    customers: [],
    customersMeta: {},
    customerByUpdate: {},
}

const customers = (state = initialState, action: CustomersActions) => {
    switch (action.type) {
        case CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS:
            return { ...state, customersMeta: action.payload.meta, customers: action.payload.customers };
        case CustomersActionTypes.FETCH_CUSTOMER_BY_UPDATE_SUCCESS:
            return { ...state, customerByUpdate: action.payload };
        default:
            return state;
    }
};

export default customers;