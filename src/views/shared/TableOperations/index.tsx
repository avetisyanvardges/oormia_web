import React, {FC} from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Popconfirm} from 'antd';
import "./style.scss";

interface IProps {
    record: any,
    handleEdit: (arg: any) => void,
    handleDelete: (arg: any) => void,
    isEdit: boolean,
    isDelete: boolean,
}

const TableOperations: FC<IProps> = ({handleEdit, handleDelete, record, isEdit, isDelete}) => {
    return (
        <div className='tableOperations' onClick={(e) => e.stopPropagation()}>
            {isEdit &&
                <span className='edit' onClick={() => handleEdit(record)}>
              <EditOutlined className='icon'/>
            </span>
            }
            {isDelete &&
                <Popconfirm title="Sure to delete?" onConfirm={(event) => handleDelete({event, id: record.id})}>
                 <span className='delete'>
                       <DeleteOutlined className='icon'/>
                 </span>
                </Popconfirm>
            }
        </div>
    )
}

export default TableOperations;
