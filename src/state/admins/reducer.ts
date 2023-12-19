import Account from 'lib/account';
import {AdminActionTypes, IInitialState} from 'state/admins/types';
import {AdminActions} from 'state/admins/actions';

const initialState: IInitialState = {
    currentAdmin: Account.getAccount(),
    users: [],
    usersMeta: {},
    userByUpdate: {},
}

const adminsReducer = (state = initialState, {type, payload}: AdminActions) => {
    switch (type) {
        case AdminActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentAdmin: payload,
            };
        case AdminActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: payload.users,
                usersMeta: payload.meta,
            };
        case AdminActionTypes.FETCH_USER_BY_UPDATE_SUCCESS:
            return {
                ...state,
                userByUpdate: payload,
            };
        default:
            return state;
    }
};

export default adminsReducer;
