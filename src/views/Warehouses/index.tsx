import React, {FC} from 'react';
import {Table} from 'antd';
import AdminLayout from 'views/layouts/Admin';
import TableHeader from 'views/shared/TableHeader';
import {IPagePropsPermissions} from "state/types";
import useContainer from './hook';

interface IProps extends IPagePropsPermissions {}

const Warehouses: FC<IProps> = (props) => {
    const { warehouses, warehousesMeta, getWarehousesLoading, params, handleChangeParams, page, columns, handleCreate } = useContainer(props);
    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader isCreate={props.create} onCreate={handleCreate} totalCount={warehousesMeta.total} />
                <Table
                    bordered
                    rowKey='id'
                    dataSource={warehouses}
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                    loading={getWarehousesLoading}
                    className='table'
                    pagination={{
                        pageSize: +params.per_page,
                        showSizeChanger: false,
                        current: +page,
                        total: warehousesMeta.total,
                        onChange: (pageNumber) => handleChangeParams(pageNumber)
                    }}
                />
            </div>
        </AdminLayout>
    )
}

export default Warehouses;