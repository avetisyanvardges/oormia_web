import React from 'react';
import {Select} from 'antd';
import useContainer from './hook';
const {Option} = Select;

const SelectRegion = ({onSelectRegionHandler, region_id}: any) => {
    const {
        regions, onselectHandler, selectValue, onSearchHandler
    } = useContainer({onSelectRegionHandler, region_id});

    return (
        <Select
            showSearch
            value={selectValue?.[0]?.id || null}
            allowClear
            onChange={onselectHandler}
            style={{ width: 190 }}
            placeholder="Մարզ"
            filterOption={false}
            onSearch={onSearchHandler}
            optionFilterProp="children"
        >
            {regions.map((item: any) => {
               return <Option key={item.region_am} value={item.id}>{item.region_am}</Option>
            })}
        </Select>
    )
}

export default SelectRegion;
