import React from 'react';
import {Checkbox, Divider, Form} from 'antd';
import {FormikProvider} from 'formik';
import PhoneInput from "react-phone-input-2";
import InputFiled from 'views/shared/forms/InputField';
import SelectRegion from 'views/shared/SelectRegion';
import SelectCommunities from 'views/shared/SelectCommunities';
import SelectCourier from 'views/shared/SelectCourier';
import SelectCustomer from 'views/shared/SelectCustomer';
import useContainer from './hook';
import "./style.scss";

interface IProps {
    title: string,
    formik?: any,
    id?: string;
}

const SelectUser: React.FC<IProps> = ({title, formik, id}) => {
    const {
        onSelectRegionHandler,
        onChangeIsCompany,
        selectedRegion,
        onSelectCourierHandler,
        onSelectCommunityHandler,
        onSelectCustomerHandler,
        selectedValues,
    } = useContainer(title, formik, id);

    const names: any = {
        recipient: 'Ստացող',
        sender: 'Ուղարկող'
    };

    return (
        <div className='select-user-component'>
            <div className='top-content'>
                <h2 style={{flex: 1}}>{names[`${title.toLowerCase()}`]}</h2>
                <SelectCustomer
                    customerId={formik.values[`${title.toLowerCase()}_id`]}
                    title={names[`${title.toLowerCase()}`]}
                    onSelectCustomerHandler={onSelectCustomerHandler}
                />
                <Divider/>
            </div>
            <Form onFinish={formik.handleSubmit} className='form'>
                <FormikProvider value={formik}>
                    <div className='two-inputs'>
                        <div>
                            <span>Անուն</span>
                            <InputFiled
                                name={`${title.toLowerCase()}.first_name`}
                                placeholder="Անուն"
                                className="input"
                                formItemClassName='input-form-item'
                            />
                        </div>
                        <div>
                            <span>Ազգանուն</span>
                            <InputFiled
                                name={`${title.toLowerCase()}.last_name`}
                                placeholder="Ազգանուն"
                                className="input"
                                formItemClassName='input-form-item'
                            />
                        </div>
                    </div>

                    <div className='two-inputs'>
                        <div>
                            <span>Հեռախոսահամար</span>
                            <Form.Item
                                className="input"
                                htmlFor={"phone"}>
                                <PhoneInput
                                    country={'am'}
                                    value={formik.values[`${title.toLowerCase()}`]['phone']}
                                    onChange={phone => formik.setFieldValue(`${title.toLowerCase()}.phone`, phone)}
                                    autoFormat
                                    enableAreaCodes
                                    countryCodeEditable
                                    enableSearch
                                    disableSearchIcon
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <span>Հասցե</span>
                            <InputFiled
                                name={`${title.toLowerCase()}.address`}
                                placeholder="Հասցե"
                                className="input"
                                formItemClassName='input-form-item'
                            />
                        </div>
                    </div>

                    <div className='two-inputs'>
                        <div>
                            <span>{`${names[`${title.toLowerCase()}`]}ը ստացել է (֏)`}</span>
                            <InputFiled
                                name={`${title.toLowerCase()}_received_money`}
                                placeholder={`${names[`${title.toLowerCase()}`]}ը ստացել է`}
                                className="input"
                                formItemClassName='input-form-item'
                            />
                        </div>
                        <div>
                            <span>{`${names[`${title.toLowerCase()}`]}ը վճարել է (֏)`}</span>
                            <InputFiled
                                name={`${title.toLowerCase()}_paid_money`}
                                placeholder={`${names[`${title.toLowerCase()}`]}ը վճարել է`}
                                className="input"
                                formItemClassName='input-form-item'
                            />
                        </div>
                    </div>
                    <div className='selected-items'>
                        <div className='item'>
                            <SelectRegion
                                onSelectRegionHandler={onSelectRegionHandler}
                                region_id={selectedValues.region_id}
                            />
                        </div>
                        <div className='item'>
                            <SelectCommunities
                                onSelectCommunityHandler={onSelectCommunityHandler}
                                selectedRegion={selectedRegion}
                                community_id={selectedValues.community_id}
                            />
                        </div>
                        <div className='item'>
                            <SelectCourier
                                onSelectCourierHandler={onSelectCourierHandler}
                                courier_id={selectedValues.courier_id}
                            />
                        </div>
                    </div>
                    <div className='check-box-content'>
                        Կազմակերպություն
                        <Checkbox
                            value={!!formik.values[title.toLowerCase()].is_company}
                            checked={!!formik.values[title.toLowerCase()].is_company}
                            className='check-box'
                            onChange={onChangeIsCompany}
                        />
                    </div>
                </FormikProvider>
            </Form>
        </div>
    );
};

export default SelectUser;
