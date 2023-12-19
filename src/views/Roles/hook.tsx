import React, {useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';

import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from 'hooks/useTypedSelector';
import useParametricSelector from "hooks/useParametricSelector";
import useMount from "hooks/useMount";
import {fetchRolesEndpoint} from "state/roles/endpoints";
import {deleteRole, fetchRolesRequest} from 'state/roles/actions';
import {IPagePropsPermissions, IRole} from 'state/types';
import TableOperations from 'views/shared/TableOperations';

function useContainer({edit, remove}: IPagePropsPermissions) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page, params, handleChangeParams } = useQueryParams();
    const { endpoint: getRolesEndpoint } = fetchRolesEndpoint;
    const { roles, rolesMeta } = useTypedSelector(({roles}) => roles);
    const { isLoading: isFetchingRoles } = useParametricSelector(getRolesEndpoint);

    /** create  */
    const handleCreateRole = () => {
        navigate(`/role/create`);
    }

    /** update  */
    const handleUpdateRole = ({id}: {id: number}) => {
        navigate(`/role/update/${id}`);
    }

    /**  delete  */
    const handleDeleteRole = ({id}: any) => {
        dispatch(deleteRole({params, id}))
    }

    /**  on params update handler  */
    const onUpdateHandler = () => {
        dispatch(fetchRolesRequest(params));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [page]);
    useMount();

    /**  Table columns  */
    const columns = useMemo(() => (
        [
            {
                title: 'Role',
                dataIndex: 'name',
                width: '50%',
            },
            {
                title: 'Operations',
                width: '50%',
                render: (_: any, record: IRole) =>
                    <TableOperations
                        isEdit={edit}
                        isDelete={remove}
                        record={record}
                        handleEdit={handleUpdateRole}
                        handleDelete={handleDeleteRole}
                    />
            },
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [roles]);

    return {
        page,
        roles,
        rolesMeta,
        params,
        isFetchingRoles,
        columns,
        handleCreateRole,
        handleChangeParams,
    }
}

export default useContainer;
