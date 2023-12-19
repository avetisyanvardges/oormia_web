import React, {FC} from "react";
import {LayoutProps} from '../types';
import "./style.scss";

const AuthLayout: FC<LayoutProps> = ({children}) => (
    <div className='authLayout'>
        <div className='dynamicContent'>{children}</div>
    </div>
)

export default AuthLayout;
