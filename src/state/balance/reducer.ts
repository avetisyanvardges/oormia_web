import {BalanceActionTypes, IInitialState} from "./types";
import {BalanceActions} from "./actions";

const initialState: IInitialState = {
    balance: [],
    balanceMeta: {},
}

const balanceReducer = (state = initialState, action: BalanceActions) => {
    switch (action.type) {
        case BalanceActionTypes.GET_BALANCE_HISTORY_SUCCESS:
            return { ...state, balanceMeta: action.payload.meta, balance: action.payload.balance };
        default:
            return state;
    }
};

export default balanceReducer;
