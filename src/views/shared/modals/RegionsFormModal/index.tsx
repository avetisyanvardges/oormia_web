import React, {FC} from "react";
import {isEmpty} from "lodash";
import {Button, Form, Modal} from 'antd';
import {FormikProvider} from 'formik';
import {IModalProps} from 'state/modals/types';
import InputFiled from "views/shared/forms/InputField";
import {IRegion} from "state/regions/types";
import {IParams} from 'state/types';
import useContainer from "./hook";
import "./style.scss";

interface Props extends IModalProps {
    title: '',
    region: IRegion,
    params: IParams,
}

const RegionsFormModal: FC<Props> = ({ onClose, title, region, params }) => {
    const { formik, loading, onSubmit } = useContainer({region, params});
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
                        loading={loading} disabled={!(formik.isValid && formik.dirty)}
                        onClick={!isEmpty(formik.touched) ? onSubmit : onClose}
                        className='save'
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <Form onFinish={formik.handleSubmit} className='form'>
                <FormikProvider value={formik}>
                    <InputFiled name="region_am" placeholder="Region am" type="text" className="input" formItemClassName='formItem' />
                    <InputFiled name="region_en" placeholder="Region en" type="text" className="input" formItemClassName='formItem' />
                    <InputFiled name="region_ru" placeholder="Region ru" type="text" className="input" formItemClassName='formItem' />
                </FormikProvider>
            </Form>
        </Modal>
    )
}

export default RegionsFormModal;
