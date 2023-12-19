import React, {FC} from 'react';
import {Button} from "antd";
// import {SearchOutlined} from "@ant-design/icons";
import "./style.scss";
import {SearchOutlined} from "@ant-design/icons";

interface IProps {
    totalCount?: number,
    onCreate: () => void,
    isCreate: boolean,
    isSetToParcel?: boolean,
    onSetToParcel?: () => void,
}

const TableHeader: FC<IProps> = ({totalCount, onCreate, isCreate, isSetToParcel, onSetToParcel}) => (
    <div className='table-header'>
        <div className='content'>
            <div className='item total-count'>Ընդհանուր քանակը` {totalCount || 0}</div>
            {isCreate && <Button className='item add' onClick={() => onCreate()}>+ Ավելացնել</Button>}
            {/*<Input prefix={<SearchOutlined />} placeholder='Փնտրել' className='item' />*/}
            {isSetToParcel && <Button className='item add' onClick={onSetToParcel}>Set to Parcel</Button>}
        </div>
    </div>
)

export default TableHeader;
