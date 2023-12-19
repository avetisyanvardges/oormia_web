import React, {FC} from 'react';
import {Table} from "antd";
import AdminLayout from 'views/layouts/Admin';
import TableHeader from 'views/shared/TableHeader';
import {IPagePropsPermissions} from "state/types";
import useContainer from './hook';

interface IProps extends IPagePropsPermissions {}

const Communities: FC<IProps> = (props) => {
    const { handleCreate, communities, columns, handleChangeParams, params, page, communitiesMeta, getCommunitiesLoading } = useContainer(props);

    return (
        <AdminLayout>
            <div className='page-with-table'>
                <TableHeader isCreate={props.create} onCreate={handleCreate} totalCount={communitiesMeta.total} />
                <Table
                    bordered rowKey='id' dataSource={communities} columns={columns}
                    loading={getCommunitiesLoading} className='table'
                    pagination={{
                        pageSize: +params.per_page,
                        showSizeChanger: false,
                        current: +page,
                        total: communitiesMeta.total,
                        onChange: (pageNumber) => handleChangeParams(pageNumber)
                    }}
                />
            </div>
        </AdminLayout>
    )
}

export default Communities;
