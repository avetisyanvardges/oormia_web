import React from 'react';
import useContainer from './hook';
import {Dropdown, Table} from 'antd';

const BalanceTable = ({balance, balanceMeta, remove, expandedRowRender, activeExpRow, setActiveExpRow}: any) => {

    const {columns, page, params, isLoading, handleChangeParams} = useContainer({balance, balanceMeta, remove});
    return (
        <div style={{marginTop: 20}}>
            <Table
                bordered
                rowKey='id'
                dataSource={balance}
                columns={columns}
                scroll={{x: 'max-content'}}
                loading={isLoading}
                className='table'
                pagination={{
                    pageSize: +params.per_page,
                    showSizeChanger: false,
                    current: +page,
                    total: balanceMeta.total,
                    onChange: (pageNumber) => handleChangeParams(pageNumber)
                }}
                expandable={{
                    expandedRowRender,
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
            />
        </div>
    );
};

export default BalanceTable;
