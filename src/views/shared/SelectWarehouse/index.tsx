import React from 'react';
import {Select} from 'antd';
import useContainer from './hook';
const {Option} = Select;

const SelectWarehouse = ({onSelectWarehouseHandler, warehouse_id,disabled}: any) => {
    const {
        onselectHandler, selectValue, onSearchHandler, warehouses
    } = useContainer({onSelectWarehouseHandler, warehouse_id});

    return (
        <Select
            showSearch
            value={selectValue?.[0]?.id || null}
            allowClear
            onChange={onselectHandler}
            style={{ width: 190 }}
            placeholder="Պահեստ"
            filterOption={false}
            onSearch={onSearchHandler}
            optionFilterProp="children"
            disabled={disabled}
        >
            {warehouses.map((item: any) => <Option key={item.id} value={item.id}>{item.warehouse_am}</Option>)}
        </Select>
    )
}

export default SelectWarehouse;
