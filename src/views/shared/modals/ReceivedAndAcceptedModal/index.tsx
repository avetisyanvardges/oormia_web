import React, {FC} from "react";
import {Button, Form, Modal, Input} from 'antd';
import {FormikProvider} from 'formik';
import {STATUS} from "constants/statuses";
import {IModalProps} from 'state/modals/types';
import InputFiled from "views/shared/forms/InputField";
import {IParams} from 'state/types';
import useContainer from "./hook";
import "../ModerateEvent/style.scss";
const { Number }: any = Input;

interface Props extends IModalProps {
    title: '',
    data: any,
    params: IParams,
    callback?:any
}

const ReceivedAndAcceptedModal: FC<Props> = ({onClose, title, data, params,callback}) => {
    const {formik, formData, loading, onSubmit} = useContainer({params, data, title,callback});
    return (
        <Modal
            title={title}
            onCancel={onClose}
            className='regions-form-modal'
            open
            footer={
                <div className='footer'>
                    <Button onClick={onClose} className='cancel'>Cancel</Button>
                    <Button
                        loading={loading}
                        onClick={onSubmit}
                        className='save'
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <Form onFinish={formik.handleSubmit} className='form'>
                <FormikProvider value={formik}>
                    {/*{data.status === STATUS.CONFIRM && data.payment_type === 'sender' || data.status !== STATUS.CONFIRM && data.payment_type === 'recipient' ?*/}
                    <div>
                        <span style={{textAlign: 'left'}}>Cost</span>
                        <InputFiled
                            name={'cost'}
                            placeholder={"Cost"}
                            className="input"
                            formItemClassName='formItem'
                            asComponent={Number}
                            type='number'
                        />
                    </div>
                     {/*: null }*/}

                    <div>
                        <span style={{textAlign: 'left'}}>
                            {
                                // @ts-ignore
                                title === "Accepted" ? "Ուղարկողը վճարել է (֏)" : "Ստացողը վճարել է (֏)"
                            }
                        </span>
                        <InputFiled
                            name={formData[0]}
                            // @ts-ignore
                            placeholder={title === "Accepted" ? "Ուղարկողը վճարել է" : "Ստացողը վճարել է"}
                            className="input"
                            formItemClassName='formItem'
                            asComponent={Number}
                            type='number'
                        />
                    </div>
                    <div>
                        <span style={{textAlign: 'left'}}>
                            {
                                // @ts-ignore
                                title === "Accepted" ? "Ուղարկողը ստացել է (֏)" : "Ստացողը ստացել է (֏)"
                            }
                        </span>
                        <InputFiled
                            name={formData[1]}
                            // @ts-ignore
                            placeholder={title === "Accepted" ? "Ուղարկողը ստացել է" : "Ստացողը ստացել է"}
                            className="input"
                            formItemClassName='formItem'
                            asComponent={Number}
                            type='number'
                        />
                    </div>

                </FormikProvider>
            </Form>
        </Modal>
    );
};

export default ReceivedAndAcceptedModal;
