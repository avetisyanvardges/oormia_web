import React, {FC} from "react";
import {isEmpty} from "lodash";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {Button, Modal, Radio, Spin} from 'antd';
import {IModalProps} from 'state/modals/types';
import useContainer from "./hook";

interface Props extends IModalProps {
    onSelectHandler: any,
    selectedParcelId?: number,
}

const SelectParcelModal: FC<Props> = ({onClose, onSelectHandler, selectedParcelId}) => {
    const {
        parcel, isFetchingParcel, value, onChange, setPage, parcelMeta, page, onSelect, onSave,
    } = useContainer({selectedParcelId, onClose, onSelectHandler});
    return (
        <Modal
            open
            title='Select user'
            className='select-modal'
            onCancel={onClose}
            footer={
                <div className='footer'>
                    <div className='left'>
                        <Button disabled={parcelMeta.current_page === 1} onClick={() => setPage(page - 1)}>
                            <ArrowLeftOutlined/>
                        </Button>
                        <Button disabled={parcelMeta.current_page === parcelMeta.last_page}
                                onClick={() => setPage(page + 1)}>
                            <ArrowRightOutlined/>
                        </Button>
                        <span className='page-counts'>{parcelMeta.current_page} / {parcelMeta.last_page}</span>
                    </div>
                    <div className='right'>
                        <Button onClick={() => onSelectHandler({})}>Clear selected</Button>
                        <Button onClick={onClose} className='cancel'>Cancel</Button>
                        <Button onClick={onSave} className='save'>Save</Button>
                    </div>
                </div>
            }
        >
            <>
                {isFetchingParcel ?
                    <div className='loader'><Spin tip="Loading" size="large"/></div> :
                    (<Radio.Group onChange={onChange} value={value} className='cards'>
                        {!isEmpty(parcel) && parcel.map((item:any) => (
                            <Radio value={item.id} className='card' key={item.id} onClick={() => onSelect(item)}>
                                <p className='name'>{item.name}</p>
                            </Radio>
                        ))
                        }
                    </Radio.Group>)
                }
            </>
        </Modal>
    )
}

export default SelectParcelModal;
