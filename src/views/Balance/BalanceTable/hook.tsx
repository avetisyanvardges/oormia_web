import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import TableOperations from 'views/shared/TableOperations';
import useQueryParams from 'hooks/useQueryParams';
import useParametricSelector from 'hooks/useParametricSelector';
import {fetchBalanceEndpoint} from 'state/balance/endpoints';
import {deleteBalanceRequest, fetchBalanceHistoryRequest} from 'state/balance/actions';
import ArrowLeft from "../../../assets/svg/ArrowLeft";
import {DatePicker} from "antd";
import ArrowRight from "../../../assets/svg/ArrowRight";
import useMount from "../../../hooks/useMount";
import {isEmpty} from "lodash";
import SelectUser from '../../shared/SelectUser';

function useContainer({balance,remove}: any) {
    const { page, params, handleChangeParams } = useQueryParams();
    const {endpoint:getEndpoint} = fetchBalanceEndpoint;
    const {isLoading} = useParametricSelector(getEndpoint);
    const dispatch = useDispatch();
    const [filterDeliveryDate, setFilterDeliveryDate] = useState('');
    const [selectedAdmin, setSelectedAdmin] = useState <any>('');
    const [selectedUser, setSelectedUser] = useState <any>('');

    const handleDelete = ({id}: any) => {
        dispatch(deleteBalanceRequest({id, params}));
    }

    const onUpdateHandler = () => {
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.created_at = filterDeliveryDate
        }
        if(selectedAdmin) {
            // @ts-ignore
            params.admin_id = selectedAdmin;
        }
        if(selectedUser) {
            // @ts-ignore
            params.user_id = selectedUser;
        }
        dispatch(fetchBalanceHistoryRequest(params))
    }

    useEffect(onUpdateHandler, [page,filterDeliveryDate, selectedUser, selectedAdmin])

    useMount(() => {
        setFilterDeliveryDate(moment(new Date()).format('YYYY-MM-DD'))
    });

    /** select admin  */
    const onSelectAdminHandler = (id: string | number) => {
        if (!id){
            setSelectedAdmin('');
            return;
        }
        setSelectedAdmin(id);
    };

    /** select user  */
    const onSelectUserHandler = (id: string | number) => {
        if (!id){
            setSelectedUser('');
            return;
        }
        setSelectedUser(id);
    };

    /**
     * Table columns
     * **/
    const columns: any = useMemo(() => (
        [
            {
                title: () => (
                    <div>
                        <p>Admin</p>
                        <SelectUser onSelectUserHandler={onSelectAdminHandler} userId={selectedAdmin} title='Filter by admins' />
                    </div>
                ),
                width: '120px',
                render: (_: any, record: any) => (
                    <div>{record?.admin?.first_name} {record?.admin?.last_name}</div>
                )
            },
            {
                title: () => (
                    <div>
                        <p>To</p>
                        <SelectUser onSelectUserHandler={onSelectUserHandler} userId={selectedUser} title='Filter by user' />
                    </div>
                ),
                width: '120px',
                render: (_: any, record: any) => (
                    <div>{record?.user?.first_name} {record?.user?.last_name}</div>
                )
            },
            {
                title: 'Type',
                width: '120px',
                dataIndex: 'type',

            },
            {
                width: '100px',
                title: 'Sum',
                dataIndex: 'sum',
            },
            {
                title: () => (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        Date
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{marginTop: 15, marginRight: 5,cursor: 'pointer'}}
                              onClick={() => setFilterDeliveryDate(moment(filterDeliveryDate).add(-1, 'days').format('YYYY-MM-DD'))}>
                            <ArrowLeft/>
                        </span>
                            <DatePicker
                                style={{marginTop: 10}}
                                onClick={(e) => e.stopPropagation()}
                                // @ts-ignore
                                value={filterDeliveryDate ? moment(filterDeliveryDate, 'YYYY-MM-DD') : ''}
                                onChange={(e: any) => setFilterDeliveryDate(e ? moment(e).format('YYYY-MM-DD') : '')}
                            />
                            <span style={{marginTop: 15, marginLeft: 5,cursor: 'pointer'}}
                                  onClick={() => setFilterDeliveryDate(moment(filterDeliveryDate).add(1, 'days').format('YYYY-MM-DD'))}>
                            <ArrowRight/>
                        </span>
                        </div>
                    </div>
                ),
                width: '17%',
                dataIndex: 'created_at',
                render: ((date: string) => moment(date).format('YYYY-MM-DD')),
            },
            {
                width: '100px',
                title: 'Comment',
                dataIndex: 'comment',
            },
            {
                width: '70px',
                title: 'Operations',
                fixed: 'right' as 'right',
                render: (_: any, record: any) =>
                    <TableOperations
                        isEdit={false}
                        isDelete={remove}
                        handleEdit={() => null}
                        record={record}
                        handleDelete={handleDelete}
                    />
            },
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [balance]);

    return {
        columns,
        handleChangeParams,
        page,
        params,
        isLoading
    }

}

export default useContainer;
