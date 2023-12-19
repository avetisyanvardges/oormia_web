import React, {FC} from "react";
import {Button, Dropdown, Layout, Menu, Space} from 'antd';
import {CloseOutlined, DownOutlined, MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import UserAvatar from 'views/shared/UserAvatar';
import LogexLogo from 'assets/svg/LogexLogo';
import {LayoutProps} from '../types';
import useContainer from './hook';
import "assets/styles/table.scss";
import "assets/styles/selectModal.scss";
import "assets/styles/createAndUpdate.scss";
import "./style.scss";

const {Header, Sider, Content} = Layout;

const AdminLayout: FC<LayoutProps> = ({children}) => {
    const {
        collapsed, handleCollapsed, menuItems, handleMenuSelect, pathname, currentAdmin, dropdownItems, contextHolder
    } = useContainer();
console.log(currentAdmin?.pictures?.[currentAdmin?.pictures?.length - 1]?.fileDownloadUri)

    return (
        <>
            {contextHolder}
            <div className='adminLayout' style={{width: '100%', position: collapsed ? 'fixed' : 'absolute'}}>
                <Sider trigger={null} collapsible collapsed={collapsed} className='sider left-menu'>
                    <Menu
                        onSelect={({key}) => handleMenuSelect(key)}
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        items={menuItems}
                        style={{backgroundColor:'#46467A', color: 'white'}}
                    />
                </Sider>
                <Layout>
                    <Header className='header'>
                        <Button className='trigger' onClick={handleCollapsed}>
                            <div className='collapsed-left-menu'>
                                {collapsed ?
                                    <MenuUnfoldOutlined style={{fontSize: '20px'}}/> :
                                    <MenuFoldOutlined style={{fontSize: '20px'}}/>}
                            </div>
                            <div className='collapsed-mobile-menu'>
                                {collapsed ?
                                    <CloseOutlined className="mobile-menu-icon"/> :
                                    <MenuOutlined className="mobile-menu-icon"/>}
                            </div>
                        </Button>
                        <div className='account'>
                            <Link to='/'><UserAvatar size={38} imageUrl={currentAdmin?.pictures?.[currentAdmin?.pictures?.length - 1]?.fileDownloadUri?.replace(':8085', ':8086')}/></Link>
                            <Dropdown menu={{items: dropdownItems}} trigger={['click']}>
                                <Space className='dropdownFullName'>
                                    <span
                                        className='name'>{`${currentAdmin?.firstName} ${currentAdmin?.lastName}`}</span>
                                    <DownOutlined/>
                                </Space>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className='content'>
                        {children}
                    </Content>
                </Layout>
            </div>
            {collapsed && <>
                <div className='background-modal' onClick={handleCollapsed}/>
                <div className='menu-content'>
                    <Menu
                        onOpenChange={(e) => console.log(e)}
                        className='mobile-header-menu'
                        selectedKeys={[pathname]}
                        mode='inline'
                        theme='light'
                        items={menuItems}
                    />
                </div>
            </>}
        </>
    )
}

export default AdminLayout;
