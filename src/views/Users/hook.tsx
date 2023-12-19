import React, {useEffect, useMemo} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Popover} from 'antd';
import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from "hooks/useTypedSelector";
import {deleteUser, fetchUsersRequest} from "state/admins/actions";
import TableOperations from "views/shared/TableOperations";
import {fetchUsersEndpoint} from "state/admins/endpoints";
import useParametricSelector from "hooks/useParametricSelector";
import useMount from "hooks/useMount";
import {ICurrentAdmin} from "state/admins/types";
import sliceText from "utils/sliceText";
import {IPagePropsPermissions} from "state/types";

function useContainer({edit, remove}: IPagePropsPermissions) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page, params, handleChangeParams } = useQueryParams();
    const { users, usersMeta } = useTypedSelector(({admins}) => admins);
    const { endpoint: getUsersEndpoint } = fetchUsersEndpoint;
    const { isLoading: getUsersLoading } = useParametricSelector(getUsersEndpoint);

    /**  create  */
    const handleCreate = () => {
        navigate('/user/create');
    };

    /**  edt  */
    const handleEdit = (user: any) => {
        navigate(`/user/update/${user.id}`);
    };

    /**  delete  */
    const handleDelete = ({id}: any) => {
        dispatch(deleteUser({params, id}));
    };

    /**  on params update handler  */
    const onUpdateHandler = () => {
        dispatch(fetchUsersRequest(params));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [page]);
    useMount();

    /**
     * Table columns
     * **/
    const columns = useMemo(() => ([
        {
            title: 'Full name',
            width: '100px',
            render: (_: any, record: ICurrentAdmin) =>
                <Popover content={<span>{`${record.firstName} ${record.lastName}`}</span>}>
                    <span>{sliceText(`${record.firstName} ${record.lastName}`, 15)}</span>
                </Popover>
        },
        {
            title: 'Phone',
            width: '100px',
            render: (_: any, record: ICurrentAdmin) =>
                <Popover content={<span>{record.phone}</span>}>
                    <span>{sliceText(record.phone, 13)}</span>
                </Popover>
        },
        {
            width: '150px',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            width: '100px',
            title: 'Community',
            dataIndex: ['community', 'community_am'],
        },
        {
            width: '100px',
            title: 'Region',
            dataIndex: ['region', 'region_am'],
        },
        {
            width: '100px',
            title: 'Address',
            dataIndex: 'address',
        },
        {
            width: '100px',
            title: 'Role',
            render: (_: any, record: ICurrentAdmin) =>
                <div className='role'>{record.role && record.role.map(({name, id}) =><span key={id + name}>{name}</span>)}</div>
        },
        {
            width: '70px',
            fixed: 'right' as 'right',
            title: 'Operations',
            render: (_: any, record: ICurrentAdmin) =>
                <TableOperations isEdit={edit} isDelete={remove} record={record} handleEdit={handleEdit} handleDelete={handleDelete} />
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ]), [users]);

    return {
        handleCreate,
        page,
        columns,
        params,
        users,
        getUsersLoading,
        usersMeta,
        handleChangeParams,
    }
}

export default useContainer;
