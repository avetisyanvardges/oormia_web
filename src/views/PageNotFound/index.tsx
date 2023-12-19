import React from 'react';
import {Button, Result} from 'antd';
import {Link} from "react-router-dom";
import "./style.scss";

const PageNotFound: React.FC = () => (
    <div className='page-not-found'>
        <Result
            className='result'
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
        />
    </div>
);

export default PageNotFound;
