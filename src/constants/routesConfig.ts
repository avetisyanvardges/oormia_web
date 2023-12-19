import React from 'react';
import Regions from 'views/Regions';
import Customers from 'views/Customers';
import Communities from 'views/Communities';
import Orders from 'views/Orders';
import Users from 'views/Users';
import Warehouses from 'views/Warehouses';
import Roles from 'views/Roles';
import CreateAndUpdateRole from "views/Roles/CreateAndUpdateRole";
import {PERMISSIONS} from './permissions';
import CreateAndUpdateCommunity from 'views/Communities/CreateAndUpdate';
import CreateAndUpdateUser from 'views/Users/CreateAndUpdate';
import CreateAndUpdateOrder from "views/Orders/CreateAndUpdateOrder";
import CreateAndUpdateCustomer from 'views/Customers/CreateAndUpdate';
import CreateAndUpdateWarehouse from 'views/Warehouses/CreateAndUpdate';
import Parcels from "../views/Parcels";
import CreateAndUpdateParcel from "../views/Parcels/CreateAndUpdateParcel";
import Courier from "../views/Courier";
import Balance from "../views/Balance";
import { CalendarOutlined } from '@ant-design/icons';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import Events from "../views/Events";
import Categories from "../views/Categories";
interface IList {
    name: string,
    component: React.FC<any>,
    path: string,
}

interface IMenuItem {
    name: React.ReactNode,
    path: string,
    icon: any
}

export const ROUTES_LIST: IList[] = [
    {
        name: 'Events',
        component: Events,
        path: '/events',
    },
    {
        name: 'Customers',
        component: Customers,
        path: '/customer',
    },
    {
        name: 'Create customer',
        component: CreateAndUpdateCustomer,
        path: '/customer/create',
    },
    {
        name: 'Update customer',
        component: CreateAndUpdateCustomer,
        path: '/customer/update/:id',
    },
    {
        name: 'Categories',
        component: Categories,
        path: '/categories',
    },
    {
        name: 'Communities',
        component: CreateAndUpdateCommunity,
        path: '/community/create',
    },
    {
        name: 'Create community',
        component: CreateAndUpdateCommunity,
        path: '/community/create',
    },
    {
        name: 'Update community',
        component: CreateAndUpdateCommunity,
        path: '/community/update/:id',
    },
    {
        name: 'Orders',
        component: Orders,
        path: '/order',
    },
    {
        name: 'Create Order',
        component: CreateAndUpdateOrder,
        path: '/order/create',
    },
    {
        name: 'Update Order',
        component: CreateAndUpdateOrder,
        path: '/order/update/:id',
    },
    {
        name: 'Users',
        component: Users,
        path: '/user',
    },
    {
        name: 'Create user',
        component: CreateAndUpdateUser,
        path: '/user/create',
    },
    {
        name: 'Update user',
        component: CreateAndUpdateUser,
        path: '/user/update/:id',
    },
    {
        name: 'Warehouses',
        component: Warehouses,
        path: '/warehouse',
    },
    {
        name: 'Create warehouse',
        component: CreateAndUpdateWarehouse,
        path: '/warehouse/create',
    },
    {
        name: 'Update warehouse',
        component: CreateAndUpdateWarehouse,
        path: '/warehouse/update/:id',
    },
    {
        name: 'Roles',
        component: Roles,
        path: '/role',
    },
    {
        name: 'Create Role',
        component: CreateAndUpdateRole,
        path: '/role/create',
    },
    {
        name: 'Update Role',
        component: CreateAndUpdateRole,
        path: '/role/update/:id',
    },
    {
        name: 'Parcels',
        component: Parcels,
        path: '/parcels',
    },
    {
        name: 'Create Parcel',
        component: CreateAndUpdateParcel,
        path: '/parcel/create',
    },
    {
        name: 'Update Parcel',
        component: CreateAndUpdateParcel,
        path: '/parcel/update/:id',
    },
    {
        name: 'Courier',
        component: Courier,
        path: '/courier',
    },
    {
        name: 'Balance',
        component: Balance,
        path: '/balance',
    },
];

export const MENU_ITEMS: IMenuItem[] = [
    {
        name: 'Events',
        path: '/events',
        icon: EventIcon
    },
    {
        name: 'Categories',
        path: '/categories',
        icon: CategoryIcon
    },

];
