import React from 'react';
import {Select} from 'antd';
import useContainer from './hook';
const {Option} = Select;

const SelectCommunities = ({selectedRegion, onSelectCommunityHandler, community_id}: any) => {
    const {
        onselectHandler, selectValue, communities, onSearchHandler
    } = useContainer({selectedRegion, community_id, onSelectCommunityHandler});

    return (
        <Select
            showSearch
            allowClear
            value={selectValue?.[0]?.id || null}
            onChange={onselectHandler}
            style={{ width: 190 }}
            placeholder="համայնք"
            optionFilterProp="children"
            filterOption={false}
            onSearch={onSearchHandler}
        >
            {communities.map((item: any) => <Option key={item.id} value={item.id}>{item.community_am}</Option>)}
        </Select>
    )
}

export default SelectCommunities;
