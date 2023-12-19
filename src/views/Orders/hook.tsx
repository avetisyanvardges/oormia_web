import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {chunk, debounce, isEmpty} from 'lodash';
import moment from "moment";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button, DatePicker, Input, Select, Col, Row} from 'antd';
import {ORDER_STATUSES, STATUS, STATUS_NAME} from 'constants/statuses';
import CopySvg from "assets/svg/CopySvg";
import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from 'hooks/useTypedSelector';
import useParametricSelector from "hooks/useParametricSelector";
import useMount from "hooks/useMount";
import {deleteOrder, fetchOrdersRequest, rejectOrderRequest} from "state/orders/actions";
import {fetchOrdersEndpoint} from "state/orders/endpoints";
import {IOrderTypes, OrderTypes} from "state/orders/types";
import {showModal} from 'state/modals/actions';
import {addOrderRequest} from "state/parcel/actions";
import {WarehousesActionTypes} from "state/warehouses/types";
import TableOperations from 'views/shared/TableOperations';
import ArrowLeft from "assets/svg/ArrowLeft";
import ArrowRight from "assets/svg/ArrowRight";
import './style.scss';

function useContainer(props: any) {
    const {page, params, handleChangeParams} = useQueryParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {endpoint: getOrdersEndpoint} = fetchOrdersEndpoint;
    const {orders, ordersMeta} = useTypedSelector(({orders}) => orders);
    const {isLoading: isFetchingOrders} = useParametricSelector(getOrdersEndpoint);
    const [confirmTrackingCode, setConfirmTrackingCode] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTrackingCode, setFilterTrackingCode] = useState('');
    const [filterSender, setFilterSender] = useState('');
    const [filterRecipient, setFilterRecipient] = useState('');
    const [filterDeliveryDate, setFilterDeliveryDate] = useState('');
    const [filterUser, setFilterUser] = useState({});
    const [copy, setCopied] = useState<string>('');
    const [tableData, setTableData] = useState<any>(orders);
    const [archiveFilter, setArchiveFilter] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState('100');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<React.Key[]>([]);
    const [selectedUser, setSelectedUser] = useState <any>('');
    const [activeExpRow, setActiveExpRow] = useState();
    const [deliveryStartDate, setDeliveryStartDate] = useState<string>('');
    const [deliveryEndDate, setDeliveryEndDate] = useState<string>('');

    const onSelectCourierHandler = (id: string | number) => {
        console.log(id, 99999999)
        if (!id) {
            setSelectedUser('');
            return;
        }
        setSelectedUser(id);
    };

    const newData = useMemo(() => {
        // @ts-ignore
        const indexArray = chunk(Array.from({length: +ordersMeta?.total || 0}, (_, i) => i + 1), pageSize)
        return tableData?.map((item: any, index: string | number) => {
            // @ts-ignore
            item = {...item, nth: indexArray?.[+params.page - 1]?.[index]}
            return item;
        });
    }, [tableData]);

    const onSetToParcel = useCallback(() => {
        console.log('Set to parcel', selectedRowKeys)
        setToParcel(selectedOrders)
    }, [selectedRowKeys]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        const newData = newSelectedRowKeys.reduce((acc:any, item)=>{
            const selectedOrder = orders.find((order: any) => order.id === item);
            acc.push({'tracking_code': selectedOrder.tracking_code})
            return acc
        }, [])
        setSelectedOrders(newData)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record: any) => {
            return {
                disabled: !(record?.status === STATUS.AT_WAREHOUSE && props.set_to_parcel && isEmpty(record?.parcel)),
            };
        }
    };

    useEffect(() => {
        setTableData(orders)
    }, [orders])

    const dragProps = {
        onDragEnd(fromIndex: any, toIndex: any) {
            const data = [...tableData];
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setTableData(data);
        },
        handleSelector: "tr",
    };

    useEffect(() => {
        if (archiveFilter) {
            setFilterDeliveryDate('')
        } else {
            setFilterDeliveryDate(moment(new Date()).format('YYYY-MM-DD'))
        }
    }, [archiveFilter])

    useEffect(() => {
        if (!isEmpty(copy)) {
            setTimeout(() => {
                setCopied('')
            }, 1000)
        }
    }, [copy]);

    const onChangePageSize = ({key}: any) => {
        setPageSize(key)
    }

    /** reject handler */
    const onRejectHandler = (code: string) => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize, delivery_date: filterDeliveryDate};
        dispatch(rejectOrderRequest({
            data: {tracking_code: code},
            params: paramsData,
        }));
    };

    /** open modal for select courier  */
    const openSelectCourierModal = (tracking_code: string) => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize};
        dispatch(showModal({
            modalType: 'SELECT_COURIER_MODAL',
            modalProps: {
                fromConfirmOrder: true,
                tracking_code,
                params: paramsData,
            }
        }))
    };

    const setToCourier = (tracking_code: string) => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize};
        dispatch(showModal({
            modalType: 'SELECT_COURIER_MODAL',
            modalProps: {
                onSelectHandler: ({courier, id}: any) => dispatch({
                    type: WarehousesActionTypes.SET_TO_COURIER,
                    payload: {
                        body: {recipient_courier_id: id, tracking_code},
                        params: paramsData,
                    }
                })
            }
        }))
    };

    /** onConfirmHandler  */
    const onConfirmHandler = (tracking_code: string) => {
        setConfirmTrackingCode(tracking_code);
        openSelectCourierModal(tracking_code);
    }

    /** handle select parcel  */
    const onSelectParcel = async (parcel_id: number, tracking_code: string | Array<any>) => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {
            ...params,
            per_page: pageSize,
        };
        dispatch(addOrderRequest({id: parcel_id, tracking_code, params: paramsData}))
        setSelectedRowKeys([])
    }

    /** set to at warehouse  */

    const setToAtWareHouse = (data:any, title:string = 'Accepted') => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize, };
        dispatch(showModal({
            modalType: 'RECEIVED_AND_ACCEPTED_MODAL',
            modalProps: {data, params, title, callback: () => {
                    dispatch({
                        type: WarehousesActionTypes.SET_TO_WAREHOUSE, payload: {
                            body: {tracking_code: data.tracking_code}, params: paramsData,
                        }
                    });
                }}
        }))
    }

    /** open parcels modal  */
    const setToParcel = (tracking_code: string | Array<any>) => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize};
        dispatch(showModal({
            modalType: 'SELECT_PARCEL_MODAL',
            modalProps: {
                onSelectHandler: (parcel_id: number) => onSelectParcel(parcel_id, tracking_code),
                params: paramsData,
            }
        }));
    }

    const handleCreateOrder = () => {
        navigate(`/order/create`);
    }

    const handleUpdateOrder = ({id}: { id: number }) => {
        navigate(`/order/update/${id}`);
    }

    const handleDeleteOrder = ({id}: any) => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize};
        dispatch(deleteOrder({params: paramsData, id}));
    }

    /** open modal for select region  */
    const onSelectUserHandler = (user: any) => {
        setFilterUser(user);
    };

    /** open modal for select user  */
    const openSelectUserModal = (): void => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        const paramsData = {...params, per_page: pageSize};
        dispatch(showModal({
            modalType: 'SELECT_USER_MODAL',
            modalProps: {
                onSelectHandler: onSelectUserHandler,
                // @ts-ignore
                selectedUserId: filterUser?.id,
                params: paramsData,
            }
        }))
    };

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterStatus)) {
            // @ts-ignore
            params.status = filterStatus
        }

        if (!isEmpty(filterSender)) {
            // @ts-ignore
            params.sender_search = filterSender
        }

        if (!isEmpty(filterRecipient)) {
            // @ts-ignore
            params.recipient_search = filterRecipient
        }

        if (!isEmpty(filterTrackingCode)) {
            // @ts-ignore
            params.tracking_code = filterTrackingCode
        }
        if (!isEmpty(filterDeliveryDate)) {
            // @ts-ignore
            params.delivery_date = filterDeliveryDate
        }
        if (!isEmpty(filterUser)) {
            // @ts-ignore
            params.user_id = String(filterUser?.id)
        }
        if (selectedUser) {
            // @ts-ignore
            params.courier_id = String(selectedUser)
        }
        if (!isEmpty(deliveryStartDate)) {
            // @ts-ignore
            params.delivery_start = deliveryStartDate
        }
        if (!isEmpty(deliveryEndDate)) {
            // @ts-ignore
            params.delivery_end = deliveryEndDate
        }

        console.log(params)

        dispatch(fetchOrdersRequest({...params, per_page: pageSize}));

    }, 200);

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [page, pageSize,deliveryStartDate, deliveryEndDate, selectedUser, filterStatus, archiveFilter, filterRecipient, filterSender, filterDeliveryDate, filterUser, filterTrackingCode]);
    useMount(() => {
        setFilterDeliveryDate(moment(new Date()).format('YYYY-MM-DD'))
        dispatch({type: OrderTypes.FETCH_ORDER_BY_ID_SUCCESS, payload: {}});
    });

    const CustomCopy = ({track}: any) => {
        return (
            <Row>
                <Col span={15}>
                    {track}
                </Col>
                <Col span={8}>
                    <CopyToClipboard text={track} onCopy={() => setCopied(track)}>
                        <span style={{
                            width: 25,
                            height: 25,
                            cursor: 'pointer',
                            color: copy === track ? '#5DBA2F' : 'black'
                        }}>
                            {copy === track ? 'Copied' : <CopySvg/>}
                        </span>
                    </CopyToClipboard>
                </Col>
            </Row>
        );
    }

    const statusChangeHandler = (e: any) => {
        setFilterStatus(e)
    }

    const columns = useMemo(() => (
        [
            {
                title: 'Row',
                width: '30px',
                dataIndex: 'nth',
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Sender
                    <Input
                        value={filterSender}
                        onChange={({target: {value}}) => setFilterSender(value)}
                        style={{marginTop: 10}}
                    />
                </div>,
                dataIndex: 'sender',
                width: '12%',
                render: ((sender: any) => `${sender?.first_name || ''} ${sender?.last_name || ''}`)
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Recipient
                    <Input
                        value={filterRecipient}
                        onChange={({target: {value}}) => setFilterRecipient(value)}
                        style={{marginTop: 10}}
                    />
                </div>,
                dataIndex: 'recipient',
                width: '12%',
                render: ((recipient: any) => `${recipient?.first_name || ''} ${recipient?.last_name || ''}`)
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Tracking code
                    <Input
                        value={filterTrackingCode}
                        onChange={({target: {value}}) => setFilterTrackingCode(value)}
                        style={{marginTop: 10}}
                    />
                </div>,
                dataIndex: 'tracking_code',
                width: '12%',
                render: (track: string) => CustomCopy({track}),
            },
            {
                title: () => (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        Delivery date
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{marginTop: 15, marginRight: 5}}
                              onClick={() => setFilterDeliveryDate(moment(filterDeliveryDate).add(-1, 'days').format('YYYY-MM-DD'))}>
                            <ArrowLeft/>
                        </span>
                            <DatePicker
                                style={{marginTop: 10}}
                                // @ts-ignore
                                onClick={(e) => e.stopPropagation()}
                                // @ts-ignore
                                value={filterDeliveryDate ? (moment(filterDeliveryDate, 'YYYY-MM-DD')) : ''}
                                onChange={((e: any) => {
                                    handleChangeParams(1)
                                    setFilterDeliveryDate(e ? moment(e).format('YYYY-MM-DD') : '')
                                })}
                            />
                            <span style={{marginTop: 15, marginLeft: 5}}
                                  onClick={() => setFilterDeliveryDate(moment(filterDeliveryDate).add(1, 'days').format('YYYY-MM-DD'))}>
                            <ArrowRight/>
                        </span>
                        </div>
                    </div>
                ),
                dataIndex: 'delivery_date',
                width: '17%',
                render: ((date: string) => moment(date).format('YYYY-MM-DD')),
                sorter: {
                    // @ts-ignore
                    compare: (a: any, b: any) => moment(a.delivery_date).unix() - moment(b.delivery_date).unix(),
                }
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Status
                    <Select
                        allowClear
                        value={filterStatus}
                        defaultValue={filterStatus}
                        style={{marginTop: 10}}
                        options={ORDER_STATUSES}
                        onChange={statusChangeHandler}
                    />
                </div>,
                dataIndex: 'status',
                width: '12%',
                render: (status: string) => STATUS_NAME[status]
            },
            {
                title: 'Sender address',
                dataIndex: ['sender', 'address'],
                width: '12%',
            },
            {
                title: 'Recipient address',
                dataIndex: ['recipient', 'address'],
                width: '12%',
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Operations
                </div>,

                // fixed: 'right' as 'right',
                width: '18%',

                render: (_: any, record: IOrderTypes) => {
                        if(!archiveFilter) {
                            return (
                                <div style={{display: 'flex', width: 'fit-content', flexDirection: 'column'}}>
                                    <div style={{marginBottom: 10}}>
                                        <TableOperations
                                            isEdit={props.edit}
                                            isDelete={props.remove}
                                            record={record}
                                            handleEdit={handleUpdateOrder}
                                            handleDelete={handleDeleteOrder}
                                        />
                                    </div>
                                    {record?.status === STATUS.IN_PROCESS && (
                                        <div>
                                            {props.order_confirm &&
                                                <Button style={{background: '#5dba2f', color: '#fff', width: 120}}
                                                        onClick={() => onConfirmHandler(record?.tracking_code)}>Confirm</Button>
                                            }
                                            {props.order_reject &&
                                                <Button style={{background: 'red', color: '#fff', width: 120}}
                                                        onClick={() => onRejectHandler(record?.tracking_code)}>Reject</Button>
                                            }
                                        </div>
                                    )}
                                    {record?.status === STATUS.AT_WAREHOUSE && props.set_to_parcel && isEmpty(record?.parcel) ?
                                        <div>
                                            <Button style={{background: 'blue', color: '#fff', width: 120}}
                                                    onClick={() => setToParcel(record?.tracking_code)}>Set to
                                                parcel</Button>
                                        </div> : null
                                    }
                                    {record?.status === STATUS.CONFIRM || record?.status === STATUS.PICKED_UP ?
                                        props.order_set_to_at_warehouse &&
                                        <div>
                                            <Button style={{background: 'blue', color: '#fff', width: 120}}
                                                    onClick={() => setToAtWareHouse(record)}>At warehouse</Button>
                                        </div>
                                        : null
                                    }
                                    {record?.status === STATUS.DISTRIBUTION_CENTER &&
                                        <div>
                                            <Button style={{background: 'blue', color: '#fff', width: 120}}
                                                    onClick={() => setToCourier(record?.tracking_code)}>Set to
                                                courier</Button>
                                        </div>
                                    }
                                </div>
                            )
                        }
                }
            },
        ]
    ), [orders, confirmTrackingCode, onConfirmHandler]);

    return {
        page,
        orders,
        ordersMeta,
        params,
        isFetchingOrders,
        columns,
        filterUser,
        openSelectUserModal,
        handleCreateOrder,
        handleChangeParams,
        setFilterUser,
        onChangePageSize,
        tableData: newData,
        dragProps,
        pageSize,
        archiveFilter,
        setArchiveFilter,
        rowSelection,
        selectedRowKeys,
        onSetToParcel,
        selectedUser,
        activeExpRow,
        onSelectCourierHandler,
        deliveryStartDate,
        deliveryEndDate,
        setDeliveryStartDate,
        setDeliveryEndDate,
        setFilterDeliveryDate
    }
}

export default useContainer;
