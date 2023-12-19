import { Select } from 'antd';

const SelectOption = ({ value, label }: any) => (
    <Select.Option value={value} key={value} label={label}>
        {label}
    </Select.Option>
);

export default SelectOption;
