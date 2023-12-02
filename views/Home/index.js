import React from 'react';
import {useWindowSize} from "../../hook/useWindowSize";
const Home = () => {
    const size = useWindowSize()
    return (
        <div className='home-page' style={{width: size.width, height: size.height}}>
            <div style={{display: 'flex', flexDirection: 'row',paddingTop: 50,alignItems: 'center'}}>
                <div style={{width: '100%',height:'100%',paddingLeft: 24}}>
                    <h1 className='title'>OOrmia - Explore | Learn | Connect</h1>
                    <p className='description'>
                        <b>Experience your community in a whole new way with OOrmia! Our app is your key to discovering
                        local events and connecting with like-minded individuals. Receive personalized event suggestions
                        based on your preferences, ensuring every day is filled with exciting opportunities. Join
                        special communities, explore unique activities, and make the most of your leisure time. With
                            features like "Request" and "Random" options for events, OOrmia adds a touch of spontaneity to
                        your plans. Download OOrmia now and dive into a world of local possibilities!</b><br/><br/>
                        <b>- See events in the map on a daily basis according to your preferences.</b><br/><br/>
                        <b>- Visits to locals houses (craftsman, painter, cook, scientist)</b><br/><br/>
                        <b>- Request meetings with professionals in your field to broaden your network, exchange insights, and establish meaningful connections.</b><br/><br/>
                        <b>- Bring your friends together! Make your own groups, and we'll find cool events that everyone will like. It's all about what you enjoy.</b><br/><br/>
                    </p>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: 24}}>
                    <img src="/assets/svgs/welcome.svg"
                         style={{width: '40%',  left: 80, position: 'relative'}}/>
                    <img src="/assets/svgs/map.svg" style={{width: '38%',  marginTop: '2%'}}/>
                </div>
            </div>
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 24,marginTop: 50}}>
                    <img src="/assets/svgs/GooglePlay.svg"
                         style={{width: 150, height: 60,marginRight: 24}}/>
                    <img src="/assets/svgs/AppStore.svg" style={{width: 150, height: 60}}/>
                </div>
                <div style={{flex: 1,marginTop: 50,marginLeft: 24}}>
                    <p style={{color: '#fff'}}>Copyright ©2023 OOrmia. All rights are reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
