import React, {useState} from 'react';
import {Col, Dropdown, Row, Table} from "antd";
import AdminLayout from 'views/layouts/Admin';
import TableHeader from "views/shared/TableHeader";
import ReactDragListView from 'react-drag-listview';
import useContainer from "./hook";
import {ORDER_PAYMENT_TYPES} from '../../constants/statuses';

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

const Courier = () => {
    const {
        handleChangeParams, page, ordersMeta, loading, columns, activeTab, dragProps, tableData,
        pageSize,
        onChangePageSize
    } = useContainer();
    const [activeExpRow, setActiveExpRow] = useState();
    const [activeExtraTab, setActiveExtraTab] = useState('sender');
    const sender = activeExtraTab === 'sender'
    const recipient = activeExtraTab === 'recipient'
    const more = activeExtraTab === 'more';
    const pickup = activeTab === 'pickup'
    const delivery = activeTab === 'delivery'

    const expandedRowRender = (data: any) => {
        const {
            phone: sender_phone,
            address: sender_address,
        } = data?.sender;
        const {
            phone: recipient_phone,
            address: recipient_address,
        } = data?.recipient;
        const {
            description,
            additional_address,
            comment,
            admin_comment,
            is_return,
            cost,
            payment_type,
        } = data;
        return (
            <Row key={data.id}>
                <Col span={1}></Col>
                <Col span={3}>
                    <p onClick={() => window.open(`tel:${sender_phone}`)}
                       style={{textAlign: 'left', cursor: 'pointer',color: '#1890ff'}}>{sender_phone}</p>
                    <p style={{textAlign: 'left'}}>{sender_address}</p>
                </Col>
                <Col span={3} offset={1}>
                    <p onClick={() => window.open(`tel:${recipient_phone}`)}
                       style={{textAlign: 'left', cursor: 'pointer', color: '#1890ff'}}>{recipient_phone}</p>
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
                </Col>
            </Row>
        );
    }

    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader isCreate={false} onCreate={() => null} totalCount={ordersMeta?.total}/>
                <ReactDragListView {...dragProps}>
                    <Table
                        rowKey='id' bordered dataSource={tableData} columns={columns}
                        loading={loading} className='table'
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
                        pagination={{
                            pageSize: +pageSize,
                            showSizeChanger: false,
                            current: +page,
                            total: ordersMeta?.total,
                            onChange: (pageNumber) => handleChangeParams(pageNumber)
                        }}
                    />
                </ReactDragListView>
            </div>
        </AdminLayout>
    );
};

export default Courier;
