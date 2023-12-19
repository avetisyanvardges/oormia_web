import React from 'react';
import {Select} from 'antd';
import useContainer from './hook';
const {Option} = Select;

const SelectCourier = ({onSelectCourierHandler, courier_id}: any) => {
    const {
        onselectHandler, selectValue, onSearchHandler, users
    } = useContainer({onSelectCourierHandler, courier_id});

    return (
        <Select
            showSearch
            allowClear
            value={selectValue?.[0]?.id || null}
            onChange={onselectHandler}
            style={{ width: 190 }}
            placeholder="Առաքիչ"
            filterOption={false}
            onSearch={onSearchHandler}
            optionFilterProp="children"
        >
            {users.map((item: any) => <Option key={item.id} value={item.id}>{item.first_name} {item.last_name}</Option>)}
        </Select>
    )
}

export default SelectCourier;
