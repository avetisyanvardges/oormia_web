import {IInitialState, WarehousesActionTypes} from 'state/warehouses/types';
import {WarehousesActions} from './actions';

const initialState: IInitialState = {
    warehouses: [],
    warehousesMeta: {},
    warehousesByUpdate: {},
}

const warehouses = (state = initialState, action: WarehousesActions) => {
    switch (action.type) {
        case WarehousesActionTypes.FETCH_WAREHOUSES_SUCCESS:
            return { ...state, warehousesMeta: action.payload.meta, warehouses: action.payload.warehouses };
        case WarehousesActionTypes.FETCH_WAREHOUSE_SUCCESS:
            return { ...state, warehouses: action.payload.warehouses };
        case WarehousesActionTypes.FETCH_WAREHOUSE_BY_UPDATE_SUCCESS:
            return { ...state, warehousesByUpdate: action.payload };
        default:
            return state;
    }
};

export default warehouses;
