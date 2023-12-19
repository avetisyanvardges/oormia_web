import {OrderActionTypes} from "./actions";
import {CategoryTypes} from "./types";

const ordersInitialState: any = {
    categories: [],
    sub_categories: []
}

const orders = (state = ordersInitialState, action: OrderActionTypes) => {
    switch (action.type) {
        case CategoryTypes.FETCH_ALL_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload};
        default:
            return state;
    }
};

export default orders;
