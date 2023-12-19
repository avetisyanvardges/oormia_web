import React, {FC} from "react";
import MODAL_COMPONENTS from "views/ModalRoot/modalComponents";
import {IModalRoot} from "state/modals/types";

const ModalRoot: FC<IModalRoot> = ({ modalType, modalProps, onClose }) => {
    if (!modalType) return null;
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal onClose={onClose} {...modalProps} />;
};

export default ModalRoot;
