import React from 'react';
import {FormikProvider} from 'formik';
import {isEmpty} from "lodash";
import moment from "moment";
import {Button, Checkbox, DatePicker, Dropdown, Form, Select, Space, Typography} from 'antd';
import {DownOutlined} from "@ant-design/icons";
import {ORDER_PAYMENT_TYPES, ORDER_STATUSES, STATUS_NAME} from "constants/statuses";
import AdminLayout from 'views/layouts/Admin';
import SelectWarehouse from 'views/shared/SelectWarehouse';
import NextButton from "views/shared/NextButton";
import InputFiled from "views/shared/forms/InputField";
import Loader from "views/shared/Loader";
import SelectUser from "../SelectUser";
import useContainer from './hook';
import './style.scss';

const CreateAndUpdateOrder = () => {
    const {
        formik,
        onChangeIsReturn,
        onChangeStatus,
        getOrderByIdLoading,
        buttonLoader,
        orderById,
        onChangePaymentType,
        onSelectHandler,
    } = useContainer();

    if (getOrderByIdLoading) return <Loader isAdmin/>

    return (
        <AdminLayout>
            <div className='create-and-update-orders'>
                <div className='form-header'>
                    <NextButton/>
                    <p className='title'>{orderById.id ? `Խմբագրել պատվերը` : 'Ավելացնել պատվեր'}</p>
                </div>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <div style={{marginLeft: 5,marginBottom: 10}}>
                                <SelectWarehouse
                                    onSelectWarehouseHandler={(e: any) => onSelectHandler(e, 'from')}
                                    warehouse_id={formik.values.from_id}
                                />
                                <span style={{fontSize:25}}>-</span>
                                <SelectWarehouse
                                    onSelectWarehouseHandler={(e: any) => onSelectHandler(e, 'to')}
                                    warehouse_id={formik.values.to_id}
                                />
                        </div>
                        <div>
                            <div className='select-users-content'>
                                <div className='select-user-item'>
                                    <SelectUser title='Sender' formik={formik} id={orderById?.sender?.id}/>
                                </div>
                                <div className='select-user-item'>
                                    <SelectUser title='Recipient' formik={formik} id={orderById?.recipient?.id}/>
                                </div>
                            </div>
                            <div className='additional-content'>
                                <h2 style={{flex: 1}}>Լրացուցիչ</h2>
                                <div className='additional-main'>
                                    <div className='additional-item'>
                                        <InputFiled
                                            name={`cost`}
                                            placeholder="Արժեք"
                                            label="Արժեք"
                                            className="input"
                                            labelClassName="label"
                                            formItemClassName='input-form-item'
                                        />
                                        <div className='selected-fields'>
                                            <div className='filed'>
                                                <div className='content'>
                                                    <div className='name'>
                                                        <span>Վճարման տեսակ</span>
                                                    </div>
                                                </div>
                                                {/*{!paymentMeta.value && paymentMeta.error ? (*/}
                                                {/*    <p style={{color: 'red'}}>{paymentMeta.error}</p>*/}
                                                {/*)}*/}
                                            </div>
                                            <Dropdown
                                                menu={{
                                                    items: ORDER_PAYMENT_TYPES,
                                                    selectable: true,
                                                    defaultSelectedKeys: [formik.values.payment_type],
                                                    onClick: onChangePaymentType
                                                }}>
                                                <Typography.Link>
                                                    <Space>
                                                        {formik.values.payment_type || 'Ընտրել վճարման տեսակը'}
                                                        <DownOutlined/>
                                                    </Space>
                                                </Typography.Link>
                                            </Dropdown>
                                        </div>
                                        <div className='selected-fields' style={{marginBottom: 10}}>
                                            <div className='filed'>
                                                <div className='content'>
                                                    <div className='name'>
                                                        <span>Առաքման ամսաթիվ</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <DatePicker
                                                value={moment(formik.values.delivery_date)}
                                                onChange={(date, dateString) =>
                                                    formik.setFieldValue('delivery_date', !isEmpty(dateString) ? moment(dateString).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'))
                                                }
                                            />
                                        </div>
                                        <div className='selected-fields' style={{marginBottom: 10}}>
                                            <div className='filed'>
                                                <div className='content'>
                                                    <div className='name'>
                                                        <span>Status</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Select
                                                allowClear
                                                value={STATUS_NAME[formik.values.status]}
                                                defaultValue={STATUS_NAME[formik.values.status]}
                                                style={{marginTop: 10}}
                                                options={ORDER_STATUSES}
                                                onChange={onChangeStatus}
                                            />
                                        </div>

                                    </div>
                                    <div className='additional-item'>
                                        <InputFiled
                                            name={`description`}
                                            placeholder="Նկարագրություն"
                                            label="Նկարագրություն"
                                            className="input"
                                            labelClassName="label"
                                            formItemClassName='input-form-item'
                                        />
                                        <InputFiled
                                            name={`additional_address`}
                                            placeholder="Լրացուցիչ հասցե"
                                            label="Լրացուցիչ հասցե"
                                            className="input"
                                            labelClassName="label"
                                            formItemClassName='input-form-item'
                                        />
                                        <InputFiled
                                            name={`comment`}
                                            placeholder="Նշումներ"
                                            label="Նշումներ"
                                            className="input"
                                            labelClassName="label"
                                            formItemClassName='input-form-item'
                                        />
                                        <InputFiled
                                            name={`admin_comment`}
                                            placeholder="Ադմինի նշումներ"
                                            label="Ադմինի նշումներ"
                                            className="input"
                                            labelClassName="label"
                                            formItemClassName='input-form-item'
                                        />
                                        <div className='check-box-content'>
                                            Հետադարձ
                                            <Checkbox
                                                value={!!formik.values.is_return}
                                                checked={!!formik.values.is_return}
                                                className='check-box'
                                                onChange={onChangeIsReturn}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='button-div'>
                            <Button loading={buttonLoader} htmlType='submit' className='submit-button'>Save</Button>
                        </div>
                    </FormikProvider>
                </Form>
            </div>
        </AdminLayout>
    );
};

export default CreateAndUpdateOrder;
