import React, {FC} from 'react';
import {Table} from 'antd';
import AdminLayout from 'views/layouts/Admin';
import TableHeader from 'views/shared/TableHeader';
import {IPagePropsPermissions} from "state/types";
import useContainer from "./hook";

interface IProps extends IPagePropsPermissions {}

const Roles: FC<IProps> = (props) => {
    const { handleChangeParams, page, params, rolesMeta, roles, isFetchingRoles, columns, handleCreateRole } = useContainer(props);

    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader isCreate={props.create} onCreate={handleCreateRole} totalCount={rolesMeta.total} />
                 <Table
                     rowKey='id' bordered dataSource={roles} columns={columns}
                     loading={isFetchingRoles} className='table'
                     pagination={{
                     pageSize: +params.per_page,
                     showSizeChanger: false,
                     current: +page,
                     total: rolesMeta.total,
                      onChange: (pageNumber) => handleChangeParams(pageNumber)
                     }}
                />
            </div>
        </AdminLayout>
    )
}

export default Roles;