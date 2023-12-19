import React, {FC} from "react";
import {isEmpty} from "lodash";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {Button, Modal, Radio, Spin} from 'antd';
import {IModalProps} from 'state/modals/types';
import useContainer from "./hook";

interface Props extends IModalProps {
    onSelectHandler: any,
    selectedCustomerId?: number,
}

const SelectCustomer: FC<Props> = ({onClose, onSelectHandler, selectedCustomerId}) => {
    const {
        customers, isFetchingRegions, value, onChange, setPage, customersMeta, page, onSelect, onSave,
    } = useContainer({selectedCustomerId, onClose, onSelectHandler});

    return (
        <Modal
            open
            title='Select customer'
            className='select-modal'
            onCancel={onClose}
            footer={
                <div className='footer'>
                    <div className='left'>
                        <Button disabled={customersMeta.current_page === 1} onClick={() => setPage(page - 1)}>
                            <ArrowLeftOutlined/>
                        </Button>
                        <Button disabled={customersMeta.current_page === customersMeta.last_page}
                                onClick={() => setPage(page + 1)}>
                            <ArrowRightOutlined/>
                        </Button>
                        <span className='page-counts'>{customersMeta.current_page} / {customersMeta.last_page}</span>
                    </div>
                    <div className='right'>
                        <Button onClick={onClose} className='cancel'>Cancel</Button>
                        {!!value && <Button onClick={onSave} className='save'>Save</Button>}
                    </div>
                </div>
            }
        >
            <>
                {isFetchingRegions ?
                    <div className='loader'><Spin tip="Loading" size="large"/></div> :
                    (<Radio.Group onChange={onChange} value={value} className='cards'>
                        {!isEmpty(customers) && customers.map(item => (
                            <Radio value={item.id} className='card' key={item.id} onClick={() => onSelect(item)}>
                                <p className='name'>{item.first_name + ' ' + item.last_name}</p>
                            </Radio>
                        ))
                        }
                    </Radio.Group>)
                }
            </>
        </Modal>
    )
}

export default SelectCustomer;
