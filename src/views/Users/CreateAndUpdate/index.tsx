import React from 'react';
import {Button, Checkbox, Divider, Form, Input} from 'antd';
import {FormikProvider} from 'formik';
import {isEmpty} from 'lodash';
import AdminLayout from 'views/layouts/Admin';
import FormHeader from 'views/shared/FormHeader';
import InputFiled from 'views/shared/forms/InputField';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import useContainer from './hook';

const CreateAndUpdateUser = () => {
    const {
        id,
        formik,
        openSelectRegionModal,
        openSelectCommunityModal,
        openSelectRoleModal,
        selectedRegion,
        loading,
        selectedCommunity,
        selectedRole,
        onChangeIsCompany,
    } = useContainer();
    return (
        <AdminLayout>
            <div className='create-and-update'>
                <FormHeader title={id ? 'Update user' : 'Create user'}/>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <InputFiled
                            name="first_name"
                            placeholder="First name"
                            label="First name"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <InputFiled
                            name="last_name"
                            placeholder="Last name"
                            label="Last name"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        <Form.Item
                            className={"input"}
                            label={<span className={"label"}>Phone</span>}
                            htmlFor={"phone"}>
                            <PhoneInput
                                country={'am'}
                                value={formik.values.phone}
                                onChange={phone => formik.setFieldValue('phone', phone)}
                                autoFormat
                                enableAreaCodes
                                countryCodeEditable
                                enableSearch
                                disableSearchIcon
                            />
                        </Form.Item>
                        <InputFiled
                            name="address"
                            placeholder="Address"
                            label="Address"
                            className="input"
                            labelClassName="label"
                            formItemClassName='input-form-item'
                        />
                        {!id &&
                            <>
                                <InputFiled
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                    className="input"
                                    labelClassName="label"
                                    formItemClassName='input-form-item'
                                />
                                <InputFiled
                                    name="password"
                                    placeholder="Password"
                                    label="Password"
                                    labelClassName="label"
                                    className="input"
                                    formItemClassName='input-form-item'
                                    asComponent={Input.Password}
                                    autoComplete="new-password"
                                />
                            </>
                        }
                        <div className='check-box-content'>
                            Is company
                            <Checkbox
                                value={!!formik.values.is_company}
                                checked={!!formik.values.is_company}
                                className='check-box'
                                onChange={onChangeIsCompany}
                            />
                        </div>
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

                        <div className='selected-fields'>
                            <div className='filed'>
                                <div className='content'>
                                    <div className='name'>
                                        <span>Community`</span>
                                        <span className='type'>
                                            {!isEmpty(selectedCommunity) ? selectedCommunity?.community : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => openSelectCommunityModal()}>Select Community</Button>
                        </div>

                        <div className='selected-fields'>
                            <div className='filed'>
                                <div className='content'>
                                    <div className='name'>
                                        <span>Role`</span>
                                        <span className='type'>
                                            {!isEmpty(selectedRole) ? selectedRole?.name : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => openSelectRoleModal()}>Select Role</Button>
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

export default CreateAndUpdateUser;
