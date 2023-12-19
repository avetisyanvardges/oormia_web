import React, {FC} from "react";
import {connect} from "react-redux";

import {hideModal} from "state/modals/actions";
import {IModalRoot} from "state/modals/types";
import ModalRootComponent from "./component";

const ModalRoot: FC<IModalRoot> = (props) => <ModalRootComponent {...props} />;

const mapStateToProps = (state: any) => ({
    modalType: state.modals.modalType,
    modalProps: state.modals.modalProps,
});

const mapDispatchToProps = {
    onClose: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
