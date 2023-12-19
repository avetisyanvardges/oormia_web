import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import Account from "lib/account";

const AuthGuard = () => {
    const accessToken = Account.getAccessToken();

    if (accessToken) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
};

export default AuthGuard;
