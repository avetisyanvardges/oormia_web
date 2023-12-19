import React, {useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";

import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from 'hooks/useTypedSelector';
import useParametricSelector from "hooks/useParametricSelector";
import useMount from "hooks/useMount";
import {deleteRegion, fetchRegionsAllRequest} from "state/regions/actions";
import {fetchRegionsEndpointAll} from "state/regions/endpoints";
import {IRegion} from "state/regions/types";
import {showModal} from 'state/modals/actions';
import TableOperations from 'views/shared/TableOperations';
import {IPagePropsPermissions} from 'state/types';

function useContainer({edit, remove}: IPagePropsPermissions) {
    const dispatch = useDispatch();
    const { page, params, handleChangeParams } = useQueryParams();
    const { endpoint: getRegionsEndpoint } = fetchRegionsEndpointAll;
    const { regionsAll, regionsAllMeta } = useTypedSelector(({regions}) => regions);
    const { isLoading: isFetchingRegions } = useParametricSelector(getRegionsEndpoint);

    /** open modal for update and create  */
    const openRegionsFormModal = (region?: IRegion) => {
        dispatch(showModal({
            modalType: 'REGIONS_FORM_MODAL',
            modalProps: {
                title: region ? 'Update Region' : 'Create region',
                region,
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
        dispatch(fetchRegionsAllRequest(params));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [page]);
    useMount();

    /**  Table columns  */
    const columns = useMemo(() => (
        [
            {
                title: 'Region',
                dataIndex: 'region_am',
                width: '50%',
            },
            {
                title: 'Operations',
                render: (_: any, record: IRegion) =>
                    <TableOperations
                        record={record}
                        isEdit={edit}
                        isDelete={remove}
                        handleEdit={openRegionsFormModal}
                        handleDelete={handleDeleteRegion}
                    />
            },
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [regionsAll]);

    return {
        page,
        regionsAll,
        regionsAllMeta,
        params,
        isFetchingRegions,
        columns,
        openRegionsFormModal,
        handleChangeParams,
    }
}

export default useContainer;
