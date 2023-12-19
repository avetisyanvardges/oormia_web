import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from 'hooks/useTypedSelector';
import useMount from "hooks/useMount";
import {deleteRegion} from "state/regions/actions";
import {IRegion} from "state/regions/types";
import {showModal} from 'state/modals/actions';
import {fetchNotModeratedRequest} from "../../state/events/actions";

function useContainer() {
    const dispatch = useDispatch();
    const { page, params, handleChangeParams } = useQueryParams();
    const { not_moderated_events } = useTypedSelector(({events}) => events);

    /** open modal for update and create  */
    const openModerateModal = (event?: any) => {
        dispatch(showModal({
            modalType: 'MODERATE_EVENT',
            modalProps: {
                title: 'Moderate event',
                event,
                params,
            }
        }))
    }

    /**  delete  */
    const handleDeleteRegion = ({id}: any) => {
        dispatch(deleteRegion({
            id: String(id),
            params,
        }));
    }

    /**  on params update handler  */
    const onUpdateHandler = () => {
        dispatch(fetchNotModeratedRequest(params));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [page]);
    useMount();


    return {
        page,
        params,
        not_moderated_events,
        openModerateModal,
        handleChangeParams,
    }
}

export default useContainer;
