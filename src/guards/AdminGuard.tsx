import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import Account from "lib/account";

const AdminGuard = () => {
    const accessToken = Account.getAccessToken();

    if (accessToken) {
        return <Outlet />
    }

    return <Navigate to='/auth/sign-in' replace />
};

export default AdminGuard;
