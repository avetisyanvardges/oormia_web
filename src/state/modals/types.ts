export enum ModalActionTypes {
    SHOW_MODAL = 'SHOW_MODAL',
    HIDE_MODAL = 'HIDE_MODAL',
}

export interface IModalState {
    modalType: string | null,
    modalProps: object,
}

export interface IShowModalPayload {
    modalType: string,
    modalProps?: object,
}

export interface IHideModalAction {
    type: ModalActionTypes.HIDE_MODAL;
}

export interface IModalRoot extends IShowModalPayload {
    onClose: () => IHideModalAction,
}

export interface IModalProps {
    onClose: () => IHideModalAction,
}
