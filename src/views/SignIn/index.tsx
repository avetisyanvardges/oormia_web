import React from 'react';
import {FormikProvider} from "formik";
import {Button, Form, Input} from "antd";
import InputFiled from 'views/shared/forms/InputField';
import AuthLayout from "views/layouts/Auth";
import MessageSvg from 'assets/svg/MessageSvg';
import PasswordSvg from 'assets/svg/PasswordSvg';
import useContainer from "./hook";
import "./style.scss";

const SignIn = () => {
    const { formik, isLoading } = useContainer();

    return (
        <AuthLayout>
            <div className='signIn'
                 style={{borderRadius: 20, display: "flex", flexDirection: 'column', justifyContent: 'space-between', paddingTop: 20,paddingBottom: 20}}>
                <p className='title montserrat'>Մուտք</p>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <div style={{}}>
                            <div>
                                <InputFiled
                                    name="email"
                                    placeholder="Էլ․ հասցե"
                                    type="email"
                                    className="signInInput montserrat"
                                    formItemClassName='emailFormItem'
                                    bordered={false}
                                    prefix={<MessageSvg/>}
                                />
                                <InputFiled
                                    name="password"
                                    placeholder="Գաղտնաբառ"
                                    className="signInInput montserrat"
                                    asComponent={Input.Password}
                                    bordered={false}
                                    prefix={<PasswordSvg/>}
                                />
                            </div>
                            {/*<div className='forgotPasswordInformation'>*/}
                            {/*    <Link to='#' className='forgotPassword'>Մոռացե՞լ եք գաղտնաբառը</Link>*/}
                            {/*</div>*/}
                            <div style={{flex: 1, display: 'flex'}}>
                                <Button loading={isLoading} htmlType='submit' className='signInButton montserrat'>
                                    Մուտք
                                </Button>
                            </div>
                        </div>
                    </FormikProvider>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default SignIn;
