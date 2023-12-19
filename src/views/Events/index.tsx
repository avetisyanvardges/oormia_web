import React, {FC} from 'react';
import {Card, Col, List, Row, Table} from 'antd';
import AdminLayout from 'views/layouts/Admin';
import TableHeader from 'views/shared/TableHeader';
import {IPagePropsPermissions} from 'state/types';
import useContainer from "./hook";
import {useMediaQuery} from "@mui/material";
import moment from "moment";

interface IProps extends IPagePropsPermissions {}

const Events: FC<IProps> = (props) => {
    const {not_moderated_events,openModerateModal} = useContainer()
    console.log(not_moderated_events)
    return (
        <AdminLayout>
            <div style={{marginTop: 15, marginLeft: 16, marginRight: 16}}>
                <h2>Not moderated events</h2>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={not_moderated_events}
                    renderItem={(item: any) => (
                        <List.Item>
                            <Card onClick={() => openModerateModal(item)}
                                  style={{borderRadius: 12, minHeight: '20vh', cursor: 'pointer'}}>
                                <Row>
                                    <Col span={12}>
                                        <img
                                            src={
                                                item?.pictures?.[item?.pictures?.length - 1]?.fileDownloadUri
                                                ||
                                                item?.preferences?.[0]?.picture?.fileDownloadUri}
                                            style={{width: 100, height: 100, borderRadius: 18}}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Row style={{alignItems: 'center'}}>
                                            <p style={{
                                                fontWeight: '500',
                                                fontSize: 12,
                                                color: '#8e9ba7'

                                            }}>Name: </p>
                                            <p style={{
                                                fontWeight: '500',
                                                fontSize: 14,
                                                marginLeft: 10
                                            }}>{item.name}</p>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <p style={{
                                                fontWeight: '500',
                                                fontSize: 12,
                                                color: '#8e9ba7'

                                            }}>Description: </p>
                                            <p style={{
                                                fontWeight: '500',
                                                fontSize: 14,
                                                marginLeft: 10
                                            }}>{item.description}</p>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <p style={{
                                                fontWeight: '500',
                                                fontSize: 12,
                                                color: '#8e9ba7'

                                            }}>Start date: </p>
                                            <p style={{
                                                fontWeight: '500',
                                                fontSize: 14,
                                                marginLeft: 10
                                            }}>{`${moment(item.startDate).format(
                                                'DD MMM HH:mm',
                                            )}`}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>
                    )}
                    style={{
                        marginTop: 20,
                    }}
                />
            </div>
        </AdminLayout>
    );
}

export default Events;
