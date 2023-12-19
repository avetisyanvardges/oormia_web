import React, {FC} from 'react';
import {Card, Col, List, Row, Table} from 'antd';
import AdminLayout from 'views/layouts/Admin';
import TableHeader from 'views/shared/TableHeader';
import {IPagePropsPermissions} from 'state/types';
import {useMediaQuery} from "@mui/material";
import moment from "moment";

interface IProps extends IPagePropsPermissions {}

const Categories: FC<IProps> = (props) => {
	return (
		<AdminLayout>
			<div style={{marginTop: 15, marginLeft: 16, marginRight: 16}}>
				<h2>Categories</h2>
			</div>
		</AdminLayout>
	);
}

export default Categories;
