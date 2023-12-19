import React from 'react';
import {Button, Divider, Form, TimePicker} from 'antd';
import {FormikProvider} from 'formik';
import {isEmpty} from 'lodash';
import AdminLayout from 'views/layouts/Admin';
import FormHeader from 'views/shared/FormHeader';
import InputFiled from 'views/shared/forms/InputField';
import DateField from 'views/shared/forms/DateField';
import useContainer from './hook';

const CreateAndUpdateWarehouse = () => {
    const {id, formik, openSelectRegionModal, regionById, loading} = useContainer();

    return (
        <AdminLayout>
            <div className='create-and-update'>
                <FormHeader title={id ? 'Update warehouse' : 'Create warehouse'}/>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <InputFiled
                            name="warehouse_am"
                            placeholder="Warehouse am"
                            label="Warehouse am"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="warehouse_ru"
                            placeholder="Warehouse ru"
                            label="Warehouse ru"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="warehouse_en"
                            placeholder="Warehouse en"
                            label="Warehouse en"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="address"
                            placeholder="Address"
                            label="Address"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="code"
                            placeholder="Code"
                            label="Code"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <DateField
                            name="open_at"
                            placeholder="Open at"
                            label="Open at"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                            asComponent={TimePicker}
                            format="HH:mm:ss"
                        />
                        <DateField
                            name="close_at"
                            placeholder="Close at"
                            label="Close at"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                            format="HH:mm:ss"
                            asComponent={TimePicker}
                        />
                        <div className='selected-fields'>
                            <div className='filed'>
                                <div className='content'>
                                    <div className='name'>
                                        <span>Region`</span>
                                        <span className='type'>
                                            {!isEmpty(regionById) ? regionById?.region_am : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => openSelectRegionModal()}>Select Region</Button>
                        </div>

                        <div className='button-div'>
                            {(formik.isValid && formik.dirty) &&
                                <Button loading={loading} htmlType='submit' className='submit-button'>Save</Button>}
                        </div>

                    </FormikProvider>
                </Form>
                <Divider/>
            </div>
        </AdminLayout>
    )
};

export default CreateAndUpdateWarehouse;
