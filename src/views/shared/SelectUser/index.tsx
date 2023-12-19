import React from 'react';
import {Select} from 'antd';
import useContainer from './hook';
const {Option} = Select;

const SelectUser = ({onSelectUserHandler, userId, title}: any) => {
    const {
        onselectHandler, selectValue, onSearchHandler, users
    } = useContainer({onSelectUserHandler, userId});

    return (
        <Select
            showSearch
            value={selectValue?.[0]?.id || null}
            allowClear
            onChange={onselectHandler}
            style={{ width: 190 }}
            placeholder={title}
            filterOption={false}
            onSearch={onSearchHandler}
            optionFilterProp="children"
        >
            {users.map((item: any) =>
                <Option key={item.id + item.firstName} value={item.id}>{`${item.firstName} ${item.lastName || ''}`}</Option>)
            }
        </Select>
    )
}

export default SelectUser;
