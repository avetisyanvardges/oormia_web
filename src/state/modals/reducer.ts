import {IModalState, ModalActionTypes} from "state/modals/types";
import {ModalActions} from 'state/modals/actions';

const initialState: IModalState = {
    modalType: null,
    modalProps: {},
};

const modalReducer = (state = initialState, action: ModalActions) => {
    switch (action.type) {
        case ModalActionTypes.SHOW_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps,
            };
        case ModalActionTypes.HIDE_MODAL:
            return initialState;
        default:
            return state;
    }
};

export default modalReducer;
