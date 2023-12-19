import React, {useState} from 'react';
import AdminLayout from 'views/layouts/Admin';
import useContainer from "./hook";
import NextButton from "../shared/NextButton";
import {Button, Col, Divider, Form, Row} from "antd";
import {FormikProvider} from "formik";
import Exchange from "../../assets/svg/ExchangeSvg";
import InputFiled from "../shared/forms/InputField";
import BalanceTable from './BalanceTable';
import {ORDER_PAYMENT_TYPES} from "../../constants/statuses";

const Balance = ({balanceTransfer,remove}: any) => {
    const {
        page,
        params,
        handleChangeParams,
        formik,
        openSelectUserModal,
        buttonLoader,
        balance, balanceMeta,
    } = useContainer();
    const [activeExpRow, setActiveExpRow] = useState();

    const expandedRowRender = (data:any) => {
        console.log(data)
        const {
            first_name:sender_name,
            last_name:sender_surname,
            phone:sender_phone,
            address:sender_address,
        } = data?.order?.sender;
        const {
            first_name:recipient_name,
            last_name:recipient_surname,
            phone:recipient_phone,
            address:recipient_address,
        } = data?.order?.recipient;


        return (
            <Row key={data.id}>
                <Col span={1}></Col>
                <Col span={3}>
                    <p style={{textAlign: 'left',color:'#5dba2f'}}>Ուղարկող</p>
                    <p style={{textAlign: 'left'}}>{sender_name + ' ' + sender_surname}</p>
                    <p style={{textAlign: 'left'}}>{sender_phone}</p>
                    <p style={{textAlign: 'left'}}>{sender_address}</p>
                </Col>
                <Col span={3} offset={1}>
                    <p style={{textAlign: 'left',color:'#5dba2f'}}>Ստացող</p>
                    <p style={{textAlign: 'left'}}>{recipient_name + ' ' + recipient_surname}</p>
                    <p style={{textAlign: 'left'}}>{recipient_phone}</p>
                    <p style={{textAlign: 'left'}}>{recipient_address}</p>
                </Col>

            </Row>
        );
    }


    return (
        <AdminLayout>
            <div className='create-and-update-orders'>
                <div className='form-header'>
                    {/*<NextButton/>*/}
                    <p className='title'>{'Balance'}</p>
                </div>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <div style={{marginBottom: 10}}>
                            <Col>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div onClick={() => openSelectUserModal('from')} style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: 'center',
                                        display: 'flex',
                                        border: '1px solid #ddd',
                                        padding: 20,
                                        borderRadius: '9px',
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        cursor: 'pointer',
                                    }}>
                                        <h3>{`From: ${formik.values.from_name}`}</h3>
                                    </div>
                                    <div onClick={() => {
                                        const from = {id: formik.values.from, name: formik.values.from_name}
                                        const to = {id: formik.values.to, name: formik.values.to_name}
                                        formik.setValues({
                                            ...formik.values,
                                            from: to.id,
                                            from_name: to.name,
                                            to: from.id,
                                            to_name: from.name
                                        });
                                    }} className='exchange'>
                                        <Exchange/>
                                    </div>

                                    <div onClick={() => openSelectUserModal('to')} style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: 'center',
                                        display: 'flex',
                                        border: '1px solid #ddd',
                                        padding: 20,
                                        borderRadius: '9px',
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        cursor: 'pointer'

                                    }}>
                                        <h3>{`To: ${formik.values.to_name}`}</h3>
                                    </div>
                                </div>
                            </Col>
                            <div style={{marginTop: 20}}>
                                <InputFiled
                                    name={`cost`}
                                    placeholder="Cost"
                                    label="Cost"
                                    className="input"
                                    labelClassName="label"
                                    formItemClassName='input-form-item'
                                />
                                <InputFiled
                                    name={`comment`}
                                    placeholder="Comment"
                                    label="Comment"
                                    className="input"
                                    labelClassName="label"
                                    formItemClassName='input-form-item'
                                />
                            </div>
                        </div>
                        <Divider/>
                        {balanceTransfer && <div className='button-div'>
                            <Button htmlType='submit' className='submit-button'>Transfer</Button>
                        </div>}
                    </FormikProvider>
                </Form>
            </div>
            <BalanceTable balance={balance} balanceMeta={balanceMeta} remove={remove} activeExpRow={activeExpRow}
                          expandedRowRender={expandedRowRender} setActiveExpRow={setActiveExpRow}/>
        </AdminLayout>
    );
};

export default Balance;
