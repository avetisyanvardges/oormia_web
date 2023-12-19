import React from 'react';
import {Button, Divider, Form} from 'antd';
import {FormikProvider} from 'formik';
import {isEmpty} from 'lodash';
import AdminLayout from 'views/layouts/Admin';
import FormHeader from 'views/shared/FormHeader';
import InputFiled from 'views/shared/forms/InputField';
import useContainer from './hook';

const CreateAndUpdateCommunity = () => {
    const {id, formik, openSelectRegionModal, selectedRegion, loading} = useContainer();

    return (
        <AdminLayout>
            <div className='create-and-update'>
                <FormHeader title={id ? 'Update community' : 'Create community'}/>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <InputFiled
                            name="community_am"
                            placeholder="Community am"
                            label="Community am"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="community_ru"
                            placeholder="Community ru"
                            label="Community ru"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="community_en"
                            placeholder="Community en"
                            label="Community en"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />

                        <div className='selected-fields'>
                            <div className='filed'>
                                <div className='content'>
                                    <div className='name'>
                                        <span>Region`</span>
                                        <span className='type'>
                                            {!isEmpty(selectedRegion) ? selectedRegion?.region : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => openSelectRegionModal()}>Select Region</Button>
                        </div>

                        <div className='button-div'>
                            {!isEmpty(selectedRegion) &&
                                <Button loading={loading} htmlType='submit' className='submit-button'>Save</Button>}
                        </div>

                    </FormikProvider>
                </Form>
                <Divider/>
            </div>
        </AdminLayout>
    )
};

export default CreateAndUpdateCommunity;