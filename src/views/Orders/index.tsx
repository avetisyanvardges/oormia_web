import React, {useState} from 'react';
import {isEmpty} from 'lodash';
import {Button, Col, Row, Table, Pagination, Dropdown, Checkbox, DatePicker} from "antd";
import {CloseCircleOutlined} from '@ant-design/icons';
import AdminLayout from 'views/layouts/Admin';
import TableHeader from "views/shared/TableHeader";
import useContainer from "./hook";
import {ORDER_PAYMENT_TYPES} from '../../constants/statuses';
import SelectUser from "../shared/SelectUser";
import SelectCourier from "../shared/SelectCourier";
import moment from "moment/moment";

const pageSizes = [
    {
        key: '10',
        label: '10 / page',
    },
    {
        key: '25',
        label: '25 / page',
    },
    {
        key: '50',
        label: '50 / page',
    },
    {
        key: '75',
        label: '75 / page',
    },
    {
        key: '100',
        label: '100 / page',
    },
]

const Orders = (props: any) => {
    const {
        handleChangeParams,
        page,
        ordersMeta,
        isFetchingOrders,
        columns,
        handleCreateOrder,
        openSelectUserModal,
        setFilterUser,
        filterUser,
        tableData,
        pageSize,
        onChangePageSize,
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
    } = useContainer(props);

    const expandedRowRender = (data:any) => {
        const {
            phone:sender_phone,
            address:sender_address,
        } = data?.sender;
        const {
            phone:recipient_phone,
            address:recipient_address,
        } = data?.recipient;

        const {
            description,
            additional_address,
            comment,
            admin_comment,
            is_return,
            cost,
            recipient_received_money,
            recipient_paid_money,
            sender_received_money,
            sender_paid_money,
            payment_type,
        } = data;
        return (
            <Row key={data.id}>
                <Col span={1}></Col>
                <Col span={3}>
                    <p style={{textAlign: 'left'}}>{sender_phone}</p>
                    <p style={{textAlign: 'left'}}>{sender_address}</p>
                </Col>
                <Col span={3} offset={1}>
                    <p style={{textAlign: 'left'}}>{recipient_phone}</p>
                    <p style={{textAlign: 'left'}}>{recipient_address}</p>
                </Col>
                <Col span={8} offset={2}>
                    {description && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Նկարագրություն</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{description}</p>
                        </Col>
                    </Row>}
                    {additional_address && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Լրացուցիչ հասցե</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{additional_address}</p>
                        </Col>
                    </Row>}
                    {comment && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Նշումներ</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{comment}</p>
                        </Col>
                    </Row>}
                    {admin_comment && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Ադմինի նշումներ։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{admin_comment}</p>
                        </Col>
                    </Row>}
                    {cost && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Արժեքը։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{cost}</p>
                        </Col>
                    </Row>}
                    {payment_type && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Վճարման տեսակ։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>
                                { // @ts-ignore
                                    ORDER_PAYMENT_TYPES.find((element: any) => element.key === payment_type).label
                                }
                            </p>
                        </Col>
                    </Row>}
                    {is_return && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>հետադարձ։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{is_return && 'Yes'}</p>
                        </Col>
                    </Row>}
                    {recipient_paid_money > 0 && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Ստացողը վճարել է։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{recipient_paid_money}</p>
                        </Col>
                    </Row>}
                    {recipient_received_money > 0 && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Ստացողը ստացել է։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{recipient_received_money}</p>
                        </Col>
                    </Row>}
                    {sender_paid_money > 0 && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Ուղարկող վճարել է։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{sender_paid_money}</p>
                        </Col>
                    </Row>}
                    {sender_received_money > 0 && <Row>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>Ուղարկող ստացել է։</p>
                        </Col>
                        <Col span={12}>
                            <p style={{color: '#8e969e'}}>{sender_received_money}</p>
                        </Col>
                    </Row>}
                </Col>
            </Row>
        );
    }
    const { RangePicker } = DatePicker;

    const handleRangeDateChange = (value:any) => {
        setDeliveryStartDate(value ? moment(value[0]).format('YYYY-MM-DD') : '')
        setDeliveryEndDate(value ? moment(value[1]).format('YYYY-MM-DD') : '');
        setFilterDeliveryDate('')
    }

    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader
                    isSetToParcel={!isEmpty(selectedRowKeys)}
                    isCreate={props.create}
                    onCreate={handleCreateOrder}
                    totalCount={ordersMeta.total}
                    onSetToParcel={onSetToParcel}
                />
                <div style={{margin: 15}}>
                    <span style={{marginRight: 20}}>Show archive</span>
                    <Checkbox
                        value={!!archiveFilter}
                        checked={!!archiveFilter}
                        className='check-box'
                        onChange={() => setArchiveFilter(!archiveFilter)}
                    />
                </div>
                <Row>
                    <div style={{marginBottom: 10, display: 'flex', alignItems: 'center'}}>
                        <Button onClick={openSelectUserModal} style={{marginLeft: 15}} className='select-user'>Created
                            by</Button>
                        {
                            // @ts-ignore
                            <span  style={{marginLeft: 10}}>{filterUser?.first_name} {filterUser?.last_name || ''}</span>}
                        {!isEmpty(filterUser) &&
                            <CloseCircleOutlined style={{marginLeft: 10, fontSize: 18}}
                                                 onClick={() => setFilterUser({})}/>
                        }
                    </div>
                    <div style={{marginLeft: 70}}>
                        <RangePicker onChange={handleRangeDateChange} onClick={(e) => e.stopPropagation()} />
                    </div>
                    <div style={{marginLeft: 30}}>
                        <SelectCourier onSelectCourierHandler={onSelectCourierHandler} courier_id={selectedUser}
                                       title='Filter by courier'/>
                    </div>

                </Row>
                <Table
                    rowSelection={rowSelection}
                    rowKey='id'
                    bordered
                    dataSource={tableData}
                    columns={columns}
                    loading={isFetchingOrders}
                    className='table'
                    expandable={{
                        expandedRowRender,
                        columnTitle: <Dropdown
                            menu={{
                                items: pageSizes,
                                selectable: true,
                                defaultSelectedKeys: ['100'],
                                onClick: onChangePageSize
                            }}>
                            <p style={{
                                marginRight: 20,
                                border: '1px solid #00000024',
                                padding: 5,
                                cursor: 'pointer'
                            }}>{pageSize}</p>
                        </Dropdown>,
                        rowExpandable: (record) => true,
                        expandedRowKeys: activeExpRow,
                        defaultExpandedRowKeys: ['0'],
                        onExpand: (expanded, record) => {
                            const keys = [];
                            if (expanded) {
                                keys.push(record.id);
                            }
                            // @ts-ignore
                            setActiveExpRow(keys);
                        }
                    }}
                    onChange={(pagination, filters, sorter, extra) => console.log(sorter)}
                    pagination={false}
                />
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
                <Pagination
                    onChange={(pageNumber: number) => handleChangeParams(pageNumber)}
                    showTitle={false}
                    pageSize={+pageSize}
                    defaultCurrent={+page}
                    total={ordersMeta.total}
                />
            </div>
        </AdminLayout>
    );
};

export default Orders;
