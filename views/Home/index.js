import React from 'react';

const Home = () => {
    return (
        <div className='home-page'>
            <h1 className='title montserrat'>OOrmia - Explore | Learn | Connect</h1>
            <div className='content'>

                <div className='image-content'>
                    <img src="/assets/svgs/welcome.svg" className='welcome animate__animated animate__tada' alt=''/>
                    <img src="/assets/svgs/map.svg" className='map ' alt=''/>
                </div>
                <div className='desc-content'>
                    <p className='description montserrat'>
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
                    <div className='stores'>
                        <img src="/assets/svgs/GooglePlay.svg" className='google-play' alt=''/>
                        <img src="/assets/svgs/AppStore.svg" className='app-store' alt=''/>
                    </div>
                </div>
            </div>
            <div className='bottom-content'>
                <div className='reserved-content'>
                    <p className='text'>Copyright ©{new Date().getFullYear()} OOrmia. All rights are reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
