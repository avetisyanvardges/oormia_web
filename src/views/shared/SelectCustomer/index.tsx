import React from 'react';
import {Select} from 'antd';
import useContainer from './hook';
const {Option} = Select;

const SelectCustomer = ({onSelectCustomerHandler, customerId, title}: any) => {
    const {
        onselectHandler, selectValue, onSearchHandler, customers
    } = useContainer({onSelectCustomerHandler, customerId, title});

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
            {customers.map((item: any) => <Option key={item.id + item.firstName} value={item.id}>{`${item.firstName} ${item.lastName || ''}`}</Option>)}
        </Select>
    )
}

export default SelectCustomer;
