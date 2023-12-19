import {IShowModalPayload, ModalActionTypes} from "state/modals/types";
import {Action, ActionWithPayload} from 'state/types';

export type showModalAction = ActionWithPayload<ModalActionTypes.SHOW_MODAL, IShowModalPayload>;
export type hideModalAction = Action<ModalActionTypes.HIDE_MODAL>;

export const showModal = ({ modalType, modalProps }: IShowModalPayload): showModalAction => ({
    type: ModalActionTypes.SHOW_MODAL,
    payload: {modalType, modalProps},
});

export const hideModal = (): hideModalAction => ({
    type: ModalActionTypes.HIDE_MODAL,
});

export type ModalActions = showModalAction | hideModalAction;
