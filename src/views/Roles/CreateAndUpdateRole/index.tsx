import React from 'react';
import {Button, Divider, Form} from 'antd';
import {FormikProvider} from 'formik';
import {isEmpty} from "lodash";

import AdminLayout from 'views/layouts/Admin';
import InputFiled from 'views/shared/forms/InputField';
import Loader from "views/shared/Loader";
import CheckBoxGroupField from "views/shared/forms/CheckBoxGroupField";
import FormHeader from 'views/shared/FormHeader';
import useContainer from './hook';
import './style.scss';

const CreateAndUpdateRole = () => {
    const {getPermissionsLoading, getRoleByIdLoading, formik, options, roleById, buttonLoader} = useContainer();

    if (getPermissionsLoading || getRoleByIdLoading) {
        return <Loader isAdmin/>
    }

    return (
        <AdminLayout>
            <div className='role-forms'>
                <FormHeader title={roleById.name ? `Update ${roleById.name} role` : 'Create new role'}/>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <p className='label'>Role name</p>
                        <InputFiled
                            name="name"
                            placeholder="Role name"
                            className="name-input"
                            formItemClassName='input-form-item'
                        />
                        <Divider/>
                        <p className='label'>Permissions</p>
                        <CheckBoxGroupField
                            items={options}
                            name='permissions'
                            className='check-box-field' sections={true}
                            formikPermissions={formik.values.permissions}
                        />
                        <div className='button-div'>
                            {!isEmpty(formik.values.permissions) &&
                                <Button loading={buttonLoader} htmlType='submit' className='submit-button'>Save</Button>
                            }
                        </div>
                    </FormikProvider>
                </Form>
            </div>
        </AdminLayout>
    )
};

export default CreateAndUpdateRole;
