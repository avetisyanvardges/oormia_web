import React, {FC} from 'react';
import {Table} from 'antd';
import AdminLayout from 'views/layouts/Admin';
import TableHeader from 'views/shared/TableHeader';
import {IPagePropsPermissions} from 'state/types';
import useContainer from "./hook";

interface IProps extends IPagePropsPermissions {}

const Regions: FC<IProps> = (props) => {
    const {
        handleChangeParams, page, params, regionsAll, regionsAllMeta, isFetchingRegions, columns, openRegionsFormModal
    } = useContainer(props);
    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader onCreate={openRegionsFormModal} totalCount={regionsAllMeta.total} isCreate={props.create} />
                 <Table
                     rowKey='id' bordered dataSource={regionsAll} columns={columns}
                     loading={isFetchingRegions} className='table'
                     pagination={{
                     pageSize: +params.per_page,
                     showSizeChanger: false,
                     current: +page,
                     total: regionsAllMeta.total,
                      onChange: (pageNumber) => handleChangeParams(pageNumber)
                     }}
                />
            </div>
        </AdminLayout>
    )
}

export default Regions;