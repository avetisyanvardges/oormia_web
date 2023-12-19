import React, {FC} from "react";
import {isEmpty} from "lodash";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {Button, Modal, Radio, Spin} from 'antd';
import {IModalProps} from 'state/modals/types';
import useContainer from "./hook";

interface Props extends IModalProps {
    onSelectHandler: any,
    selectedUserId?: number,
}

const SelectUserModal: FC<Props> = ({onClose, onSelectHandler, selectedUserId}) => {
    const {
        users, isFetchingUsers, value, onChange, setPage, usersMeta, page, onSelect, onSave,
    } = useContainer({selectedUserId, onClose, onSelectHandler});

    return (
        <Modal
            open
            title='Select user'
            className='select-modal'
            onCancel={onClose}
            footer={
                <div className='footer'>
                    <div className='left'>
                        <Button disabled={usersMeta.current_page === 1} onClick={() => setPage(page - 1)}>
                            <ArrowLeftOutlined/>
                        </Button>
                        <Button disabled={usersMeta.current_page === usersMeta.last_page}
                                onClick={() => setPage(page + 1)}>
                            <ArrowRightOutlined/>
                        </Button>
                        <span className='page-counts'>{usersMeta.current_page} / {usersMeta.last_page}</span>
                    </div>
                    <div className='right'>
                        <Button onClick={() => onSelect({})}>Clear selected</Button>
                        <Button onClick={onClose} className='cancel'>Cancel</Button>
                        <Button onClick={onSave} className='save'>Save</Button>
                    </div>
                </div>
            }
        >
            <>
                {isFetchingUsers ?
                    <div className='loader'><Spin tip="Loading" size="large"/></div> :
                    (<Radio.Group onChange={onChange} value={value} className='cards'>
                        {!isEmpty(users) && users.map(item => (
                            <Radio value={item.id} className='card' key={item.id} onClick={() => onSelect(item)}>
                                <p className='name'>{item.firstName + ' ' + item.lastName}</p>
                            </Radio>
                        ))
                        }
                    </Radio.Group>)
                }
            </>
        </Modal>
    )
}

export default SelectUserModal;
