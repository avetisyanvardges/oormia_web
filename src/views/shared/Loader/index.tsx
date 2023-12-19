import React from "react";
import {Spin} from "antd";
import AdminLayout from "views/layouts/Admin";
import AuthLayout from "views/layouts/Auth";

const Loader =
    ({isAdmin, isAuth, withAuthLayout}: {isAdmin?: boolean, isAuth?: boolean, withAuthLayout?: boolean}) => (
    <>
        {isAdmin && <AdminLayout><Spin style={{marginTop: 50, marginLeft: '50%'}} /></AdminLayout>}
        {isAuth && <AuthLayout><Spin style={{marginTop: 50, marginLeft: '50%'}} /></AuthLayout>}
        {withAuthLayout && <Spin style={{marginTop: 50, marginLeft: '50%'}} />}
    </>
)

export default Loader;