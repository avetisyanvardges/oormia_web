import React from "react";
import {Divider} from "antd";
import AdminLayout from "views/layouts/Admin";
import UserAvatar from "views/shared/UserAvatar";
import useContainer from "./hook";
import "./style.scss";

const Home = () => {
    const { currentAdmin } = useContainer();
    return (
        <AdminLayout>
            <div className='home'>
                <div className='top-content'>
                    <h3 className='title'>Անձնական տվյալներ</h3>
                    <div className='content'>
                        <UserAvatar imageUrl={currentAdmin?.pictures?.[currentAdmin?.pictures?.length - 1]?.fileDownloadUri?.replace(':8085', ':8086')} size={138} />
                        <div className='right'>
                            <div className='information-content'>
                                <p className='name'>{currentAdmin.firstName} {currentAdmin.lastName}</p>
                                {currentAdmin.address && <p className='info'>{`Հասցե${'՝'} ${currentAdmin.address}`}</p>}
                                {currentAdmin.phone && <p className='info'>{`Հեռ${'՝'} ${currentAdmin.phone}`}</p>}
                                {currentAdmin.email && <p className='info'>{`Էլ․ հասցե${'՝'} ${currentAdmin.email}`}</p>}
                                {/*<div className='button-content'>*/}
                                {/*    <Button className='button'>*/}
                                {/*        Թարմացնել տվյալները*/}
                                {/*    </Button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
            </div>
        </AdminLayout>
    )
};

export default Home;
