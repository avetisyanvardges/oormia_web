import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {notification} from 'antd';
import type {MenuProps} from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useTypedSelector from 'hooks/useTypedSelector';
import LogAuth from 'assets/svg/LogAuth';
import Account from 'lib/account';
import history from "utils/browserHistory";
import {MENU_ITEMS} from "constants/routesConfig";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label,} as MenuItem;
}

const dropdownItemStyles = {
    minWidth: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

function useContainer() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { currentAdmin } = useTypedSelector(({admins}) => admins);
    const {notificationError} = useTypedSelector(({data}) => data);

    /**  menu items  */
    const menuItems: MenuItem[] = [
        getItem(<Link to='/'>Profile</Link>, '/', <AccountCircleIcon style={{fontSize: 'large'}}/>),
        ...MENU_ITEMS.reduce((acc: MenuItem[], item) => {

            if(currentAdmin.role === 'ADMIN') {
                acc.push(getItem(<Link to={item.path}>{item.name}</Link>, item.path, <item.icon style={{fontSize: 'large'}} />));
            }
            return acc;
        }, []),
    ];

    /**  handle menu selected  */
    const handleMenuSelect = useCallback((key: string) => {
        navigate(key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    /**  handle menu collapsed  */
    const handleCollapsed = useCallback(() => {
        setCollapsed(prev => !prev);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collapsed]);

    /**  handle logAuth  */
    const handleLogAuth = () => {
        Account.delete();
        history.replace('/auth/sign-in');
    }

    /**  dropdown items  */
    const dropdownItems: MenuProps['items'] = useMemo(() => ([
        {
            label: <div style={dropdownItemStyles} onClick={handleLogAuth}><LogAuth /> Դուրս գալ</div>,
            key: 'Դուրս գալ',
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ]), []);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (error:string) => {
        api['error']({
            message: `Error`,
            description: error,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if(Object(notificationError).hasOwnProperty('error')) {
            if (typeof notificationError?.error === 'string') {
                openNotification(notificationError?.error)
            } else {
                Object.keys(notificationError?.error).map((item) => {
                    openNotification(notificationError?.error[item])
                })
            }
        }

        return () => notification.destroy()
    }, [notificationError]);

    return {
        collapsed,
        currentAdmin,
        handleCollapsed,
        handleMenuSelect,
        pathname,
        menuItems,
        dropdownItems,
        contextHolder,
    }
}

export default useContainer;
