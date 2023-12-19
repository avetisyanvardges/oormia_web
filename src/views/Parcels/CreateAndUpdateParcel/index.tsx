import React from 'react';
import {isEmpty} from "lodash";
import {FormikProvider} from "formik";
import {Button, Col, Form, Row, Table} from "antd";
import AdminLayout from 'views/layouts/Admin';
import NextButton from "views/shared/NextButton";
import Loader from "views/shared/Loader";
import InputFiled from "views/shared/forms/InputField";
import SelectWarehouse from "views/shared/SelectWarehouse";
import useContainer from './hook';
import './style.scss';
import {STATUS} from "../../../constants/statuses";

const CreateAndUpdateParcel = (props: any) => {
    const {
        formik,
        getParcelByIdLoading,
        openSelectCourierModal,
        createLoader,
        updateLoader,
        getUserByIdLoading,
        params,
        page,
        parcelById,
        parcelMeta,
        handleChangeParams,
        isFetchingOrders,
        columns,
        addOrderToParcel,
        onRouteSelectHandler
    } = useContainer(props);

    if (getParcelByIdLoading || getUserByIdLoading) return <Loader isAdmin/>

    return (
        <AdminLayout>
            <div className='create-and-update-parcel'>
                <div className='form-header'>
                    <NextButton redirectRoute={'/parcels'}/>
                    <p className='title'>{parcelById ? `Update parcel` : 'Create new parcel'}</p>
                </div>
                <Form onFinish={formik.handleSubmit} className='form'>
                    <FormikProvider value={formik}>
                        <Row gutter={36}>
                            <Col span={12}>
                                <div style={{border: '1px solid #ddd', padding: 20, borderRadius: '9px'}}>
                                    <div className='form'>
                                        <div className='from-and-to'>
                                            <div className='item'>
                                                <h2>From</h2>
                                                <SelectWarehouse
                                                    onSelectWarehouseHandler={(e: any) => onRouteSelectHandler(e, 'from')}
                                                    warehouse_id={formik.values.from_id}
                                                    disabled={parcelById.status === STATUS.RECEIVED}

                                                />
                                            </div>
                                            <div className='item'>
                                                <h2>To</h2>
                                                <SelectWarehouse
                                                    onSelectWarehouseHandler={(e: any) => onRouteSelectHandler(e, 'to')}
                                                    warehouse_id={formik.values.to_id}
                                                    disabled={parcelById.status === STATUS.RECEIVED}

                                                />
                                            </div>
                                        </div>
                                        <Row>
                                            <Col span={12}>
                                                <div className='name'>
                                                    <span>Courier`</span>
                                                    <span
                                                        className='type'>{!isEmpty(formik.values.courier) && formik.values.courier}</span>
                                                </div>
                                            </Col>
                                            {parcelById.status !== STATUS.RECEIVED ? <Col span={12}>
                                                <Button onClick={() => openSelectCourierModal()}>Select Courier</Button>
                                            </Col> : null}
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            {parcelById.status !== STATUS.RECEIVED ? <Col span={12}>
                                <div className='button-div'>
                                    <Button loading={updateLoader} htmlType='submit'
                                            className='submit-button'>Save</Button>
                                </div>
                            </Col> : null}
                        </Row>
                        {parcelById.status !== STATUS.RECEIVED ? <Row style={{marginTop: 15}}>
                            <Col span={12}>
                                <InputFiled
                                    name={`track_code`}
                                    placeholder="Tracking code"
                                    className="input"
                                    labelClassName="label"
                                    formItemClassName='input-form-item'
                                />
                            </Col>
                            <Col span={12}>
                                <Button loading={createLoader}
                                        onClick={() => addOrderToParcel(parcelById.id, formik.values.track_code)}
                                        style={{marginLeft: 10, backgroundColor: 'blue', color: 'white'}}>Set to
                                    parcel</Button>
                            </Col>
                        </Row> : null}
                    </FormikProvider>
                </Form>
                <div style={{marginTop: 30}}>
                    <Table
                        rowKey='id' bordered dataSource={parcelById.orders} columns={columns}
                        loading={isFetchingOrders} className='table'
                        expandable={{defaultExpandedRowKeys: ['0']}}
                        pagination={{
                            pageSize: +params.per_page,
                            showSizeChanger: false,
                            current: +page,
                            total: parcelMeta.total,
                            onChange: (pageNumber) => handleChangeParams(pageNumber)
                        }}
                    />
                </div>
            </div>
        </AdminLayout>
    );


};

export default CreateAndUpdateParcel;
