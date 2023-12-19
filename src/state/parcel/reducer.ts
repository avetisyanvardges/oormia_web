import {IParcelState, ParcelTypes} from "./types";
import {ParcelActionTypes} from "./actions";

const initialState: IParcelState = {
    parcel: [],
    parcelMeta: {},
    parcelById: {
        id: 0,
        name: '',
        courier_id: '',
        orders: []
    },
}

const parcels = (state = initialState, action: ParcelActionTypes) => {
    switch (action.type) {
        case ParcelTypes.FETCH_PARCELS_SUCCESS:
            return {...state, parcel: action.payload.parcel, parcelMeta: action.payload.meta};
        case ParcelTypes.FETCH_PARCEL_BY_ID_SUCCESS:
            return {...state, parcelById: action.payload};
        case ParcelTypes.CLEAN_PARCEL_REDUCER:
            return {
                ...state, parcelById: {
                    id: 0,
                    name: '',
                    courier_id: '',
                    orders: []
                }
            };
        default:
            return state;
    }
};

export default parcels;
