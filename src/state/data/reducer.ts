import {DataRequestTypes} from 'state/data/types';
import {DataRequestActions} from 'state/data/actions';

interface IInitialState {
    [key: string]: any,
    notificationError?: any,
}

const initialState: IInitialState = {
    notificationError: null,
}

const dataReducer = (state = initialState, action: DataRequestActions) => {
    switch (action.type) {
        case DataRequestTypes.DATA_API_REQUEST:
            return {
                ...state,
                [action.payload.endpoint]: { loading: true, notificationError: null },
            };
        case DataRequestTypes.DATA_API_SUCCESS:
            return {
                ...state,
                [action.payload.endpoint]: { loading: false, response: action.payload.response },
            };
        case DataRequestTypes.DATA_API_FAILURE:
            return {
                ...state,
                [action.payload.endpoint]: { loading: false, error: action.payload.error || null },
                notificationError: action.payload.error,
            };

        case DataRequestTypes.CLEAR_DATA_REDUCER: return {};
        default: return state;
    }
};

export default dataReducer;
