import React, {FC} from 'react';
import {Table} from "antd";
import TableHeader from "views/shared/TableHeader";
import AdminLayout from 'views/layouts/Admin';
import {IPagePropsPermissions} from "state/types";
import useContainer from "./hook";

interface IProps extends IPagePropsPermissions {}

const Customers: FC<IProps> = (props) => {
    const {
        customers, handleCreate, customersMeta, columns, handleChangeParams, params, page, getCustomersLoading
    } = useContainer(props);

    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader isCreate={props.create} onCreate={handleCreate} totalCount={customersMeta.total} />
                <Table
                    bordered
                    rowKey='id'
                    dataSource={customers}
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                    loading={getCustomersLoading}
                    className='table'
                    pagination={{
                        pageSize: +params.per_page,
                        showSizeChanger: false,
                        current: +page,
                        total: customersMeta.total,
                        onChange: (pageNumber) => handleChangeParams(pageNumber)
                    }}
                />
            </div>
        </AdminLayout>
    )
}

export default Customers;
