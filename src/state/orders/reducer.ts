import {IOrdersState, OrderTypes} from "./types";
import {OrderActionTypes} from "./actions";

const ordersInitialState: IOrdersState = {
    ordersMeta: {},
    orders: [],
    orderById:{},
    courier_orders: []
}

const orders = (state = ordersInitialState, action: OrderActionTypes) => {
    switch (action.type) {
        case OrderTypes.FETCH_ORDERS_SUCCESS:
            return {...state, ordersMeta: action.payload.meta, orders: action.payload.orders};
        case OrderTypes.FETCH_ORDER_BY_ID_SUCCESS:
            return {...state, orderById: action.payload};
        case OrderTypes.FETCH_PICKUP_ORDERS_SUCCESS:
            return {...state, ordersMeta: action.payload.meta, courier_orders: action.payload.orders};
        case OrderTypes.FETCH_DELIVERY_ORDERS_SUCCESS:
            return {...state, ordersMeta: action.payload.meta, courier_orders: action.payload.orders};
        default:
            return state;
    }
};

export default orders;
