import {IRolesState, RolesTypes} from 'state/roles/types';
import {RolesActionTypes} from 'state/roles/actions';

const initialState: IRolesState = {
    roles: [],
    rolesMeta: {},
    permissions: [],
    roleById: {
        id: 0,
        name: '',
        permissions: [],
    },
}

const roles = (state = initialState, action: RolesActionTypes) => {
    switch (action.type) {
        case RolesTypes.FETCH_ROLES_SUCCESS:
            return { ...state, roles: action.payload.roles, rolesMeta: action.payload.meta };
        case RolesTypes.FETCH_PERMISSIONS_SUCCESS:
            return { ...state, permissions: action.payload };
        case RolesTypes.FETCH_ROLE_BY_ID_SUCCESS:
            return { ...state, roleById: action.payload };
        default:
            return state;
    }
};

export default roles;