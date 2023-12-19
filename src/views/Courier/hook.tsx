import React, {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Select} from 'antd';
import {DragOutlined} from '@ant-design/icons';
import moment from "moment";
import {debounce, isEmpty} from "lodash";
import {CopyToClipboard} from "react-copy-to-clipboard";
import useMount from "hooks/useMount";
import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from 'hooks/useTypedSelector';
import useParametricSelector from "hooks/useParametricSelector";
import {fetchDeliveryOrdersEndpoint, fetchPickupOrdersEndpoint} from "state/orders/endpoints";
import {IOrderTypes} from "state/orders/types";
import {showModal} from 'state/modals/actions';
import {fetchPickupOrdersRequest, sortOrderRequest} from "state/orders/actions";
import {ORDER_STATUSES, STATUS, STATUS_NAME} from "constants/statuses";
import CopySvg from "assets/svg/CopySvg";

function useContainer() {
    const dispatch = useDispatch();
    const { page, params, handleChangeParams } = useQueryParams();
    const [activeTab, setActiveTab] = useState('pickup')
    const { endpoint: getPickupEndpoint } = fetchPickupOrdersEndpoint;
    const { endpoint: getDeliveryEndpoint } = fetchDeliveryOrdersEndpoint;
    const { orders, ordersMeta, courier_orders } = useTypedSelector(({orders}) => orders);
    const { isLoading: isFetchingPickup } = useParametricSelector(getPickupEndpoint);
    const { isLoading: isFetchingDelivery } = useParametricSelector(getDeliveryEndpoint);
    const [confirmTrackingCode, setConfirmTrackingCode] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTrackingCode, setFilterTrackingCode] = useState('');
    const [filterDeliveryDate, setFilterDeliveryDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [copy, setCopied] = useState<string>('');
    const [tableData, setTableData] = useState<any>(courier_orders);
    const [filterSender, setFilterSender] = useState('');
    const [filterRecipient, setFilterRecipient] = useState('');
    const [pageSize, setPageSize] = useState('100');

    useEffect(() => {
        setTableData(courier_orders)
    }, [courier_orders])

    const dragProps = {
        onDragEnd(fromIndex: any, toIndex: any) {
            const data = [...tableData];
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);

            const orders = data.reduce((acc, item, index) => {
                acc.push({order_id: item.id, sorting: data.length - index})
                return acc
            }, [])
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
            dispatch(sortOrderRequest({orders, params:{...params, per_page: pageSize}}))
            setTableData(data);
        },
        handleSelector: "a",
    };

    const onChangePageSize = ({key}: any) => {
        setPageSize(key)
    }

    const handleOpenModal = (data: any, title: string) => {
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
        const paramsData = {...params, per_page: pageSize};
        dispatch(showModal({
            modalType: 'RECEIVED_AND_ACCEPTED_MODAL',
            modalProps: {data, params: paramsData, title},
        }))
    }

    /** onConfirmHandler  */
    const onConfirmHandler = (tracking_code: string) => {
        setConfirmTrackingCode(tracking_code);
    }


    // TODO - handle params update
    const onUpdateTabs = debounce(() => {
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
        dispatch(fetchPickupOrdersRequest({...params, per_page: pageSize}));
    }, 200);

    // TODO - Lifecycle
    useEffect(onUpdateTabs, [page, filterStatus,filterSender,filterRecipient, filterDeliveryDate, filterTrackingCode]);
    useMount();

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
                            {copy === track ? 'Copied' : <CopySvg />}
                        </span>
                    </CopyToClipboard>
                </Col>
            </Row>
        );
    }

    const statusChangeHandler = (e:any) => {
        setFilterStatus(e)
    }

    // TODO - Table columns
    const columns = useMemo(() => (
        [
            {
                title: 'Type',
                dataIndex: 'type',
                width: '100px',
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
                width: '15%',
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
                width: '15%',
                render: ((recipient: any) => `${recipient?.first_name || ''} ${recipient?.last_name || ''}`)
            },
            {
                title: 'Address',
                width: '15%',
                render: ((_: any, record: any) => {
                    return (
                        <div style={{display: 'flex'}}>
                            {record.status === STATUS.CONFIRM ?
                                <span>
                                    {record?.sender?.address}
                                </span> :
                                <span>
                                    {record?.recipient?.address}
                                </span>
                            }
                        </div>
                    );
                }),
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
                width: '15%',
                render: (track: string) => CustomCopy({track}),
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Delivery date
                    <DatePicker
                        style={{marginTop: 10}}
                        // @ts-ignore
                        onClick={(e) => e.stopPropagation()}
                        // @ts-ignore
                        value={filterDeliveryDate ? (moment(filterDeliveryDate, 'YYYY-MM-DD')) : ''}
                        onChange={((e: any) => setFilterDeliveryDate(e ? moment(e).format('YYYY-MM-DD') : ''))}
                    />
                </div>,
                dataIndex: 'delivery_date',
                width: '15%',
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
                width: '15%',
                render: (status: string) => STATUS_NAME[status]
            },
            {
                title: 'Operations',
                fixed: 'right' as 'right',
                width: '23%',
                render: (_: any, record: IOrderTypes) =>
                    <div style={{display: 'flex', width: '120px', justifyContent: 'space-between'}}>
                        {
                            // @ts-ignore
                            record?.type === 'Pickup' &&
                            <Button onClick={() => handleOpenModal(record, 'Accepted')}>
                                Accepted
                            </Button>}
                        {
                            // @ts-ignore
                            record?.type === 'Delivery' &&
                            <Button
                                onClick={() => handleOpenModal(record, 'Received')}
                                style={{marginLeft: 5}}>
                                Delivered
                            </Button>}
                        <a style={{cursor: 'move', fontSize: 20}} href="#"><DragOutlined/></a>
                    </div>
            },
        ]
    ), [courier_orders, confirmTrackingCode, onConfirmHandler]);

    return {
        page,
        orders,
        ordersMeta,
        params,
        loading: isFetchingPickup || isFetchingDelivery,
        columns,
        handleChangeParams,
        courier_orders,
        activeTab,
        tableData,
        dragProps,
        setActiveTab,
        pageSize,
        onChangePageSize

    }
}

export default useContainer;
