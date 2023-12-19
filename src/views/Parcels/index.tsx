import React from 'react';
import {Table} from "antd";
import AdminLayout from 'views/layouts/Admin';
import TableHeader from "views/shared/TableHeader";
import useContainer from "./hook";

const Parcels = (props: any) => {
    const {
        handleCreateParcel,
        parcel,
        parcelMeta,
        columns,
        isFetchingParcel,
        params,
        page,
        handleChangeParams,
        handleUpdateParcel
    } = useContainer(props);

    return (
        <AdminLayout>
            <div className='orders'>
                <TableHeader isCreate={props.create} onCreate={handleCreateParcel} totalCount={parcelMeta.total}/>
                <Table
                    rowKey='id' bordered dataSource={parcel} columns={columns}
                    loading={isFetchingParcel} className='table'
                    expandable={{defaultExpandedRowKeys: ['0']}}
                    pagination={{
                        pageSize: +params.per_page,
                        showSizeChanger: false,
                        current: +page,
                        total: parcelMeta.total,
                        onChange: (pageNumber) => handleChangeParams(pageNumber)
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => handleUpdateParcel({id: record.id, event}),
                        };
                    }}
                    style={{cursor: 'pointer'}}
                />
            </div>
        </AdminLayout>
    );
};

export default Parcels;
