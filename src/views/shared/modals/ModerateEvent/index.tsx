import React, {FC} from "react";
import {Button, Form, Modal, Input, Row, Col} from 'antd';
import {FormikProvider} from 'formik';
import {STATUS} from "constants/statuses";
import {IModalProps} from 'state/modals/types';
import InputFiled from "views/shared/forms/InputField";
import {IParams} from 'state/types';
import useContainer from "./hook";
import "./style.scss";
import moment from "moment/moment";
const { Number }: any = Input;

interface Props extends IModalProps {
    title: '',
    event: any,
    params: IParams,
    callback?:any
}

const ModerateEventModal: FC<Props> = ({onClose, title, event, params,callback}) => {
    const { loading, onSubmit} = useContainer({event,onClose});
    console.log(event, "title")
    return (
        <Modal
            title={title}
            onCancel={onClose}
            className='regions-form-modal'
            open
            footer={
                <div className='footer'>
                    <Button onClick={onClose} className='cancel'
                            style={{borderRadius: 12}}
                    >Reject</Button>
                    <Button
                        loading={loading}
                        onClick={onSubmit}
                        className='save'
                        style={{borderRadius: 12}}
                    >
                        Accept
                    </Button>
                </div>
            }
        >
            <div>
                <div>
                    <img
                        src={
                            event?.pictures?.[event?.pictures?.length - 1]?.fileDownloadUri
                            ||
                            event?.preferences?.[0]?.picture?.fileDownloadUri}
                        style={{width: '100%', borderRadius: 18}}
                    />
                    <Row style={{marginTop: 20, alignItems: 'center',}}>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#8e9ba7'
                        }}>Name: </p>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            marginLeft: 10
                        }}>{event.name}</p>
                    </Row>
                    <Row>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#8e9ba7'

                        }}>Description: </p>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            marginLeft: 10
                        }}>{event.description}</p>
                    </Row>
                    <Row>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#8e9ba7'

                        }}>Start date: </p>
                        <h5 style={{
                            fontWeight: '500',
                            fontSize: 16,
                            marginLeft: 10
                        }}>{`${moment(event.startDate).format(
                            'DD MMM HH:mm',
                        )} - ${moment(event.endDate).format(
                            'DD MMM HH:mm',
                        )}`}</h5>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <p style={{
                                fontWeight: '500',
                                fontSize: 16,
                                color: '#8e9ba7'

                            }}>Address: </p>
                        </Col>
                        <Col span={18}>
                            <h5 style={{
                                fontWeight: '500',
                                fontSize: 16,
                                marginLeft: 10
                            }}>{event.address}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#8e9ba7'

                        }}>Price: </p>
                        <h5 style={{
                            fontWeight: '500',
                            fontSize: 16,
                            marginLeft: 10,
                            color: '#5DBA2F'
                        }}>{event.price || 'Free'}</h5>
                    </Row>
                    <Row>
                        <p style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#8e9ba7'

                        }}>Organizer: </p>
                        <h5 style={{
                            fontWeight: '500',
                            fontSize: 16,
                            marginLeft: 10,
                        }}>{`${event?.creator?.firstName} ${event?.creator?.lastName}`}</h5>
                    </Row>

                </div>
            </div>
        </Modal>
    );
};

export default ModerateEventModal;
