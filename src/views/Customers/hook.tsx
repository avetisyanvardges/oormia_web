import React, {useEffect, useMemo, useState} from "react";
import {useDispatch} from 'react-redux';
import useMount from "hooks/useMount";
import useQueryParams from "hooks/useQueryParams";
import useTypedSelector from "hooks/useTypedSelector";
import useParametricSelector from "hooks/useParametricSelector";
import TableOperations from "views/shared/TableOperations";
import {deleteCustomer, fetchCustomersRequest} from "state/customers/actions";
import {fetchCustomersEndpoint} from "state/customers/endpoints";
import {ICustomers} from "state/customers/types";
import {IPagePropsPermissions} from "state/types";
import {useNavigate} from 'react-router-dom';
import {debounce, chunk} from 'lodash';

function useContainer({edit, remove}: IPagePropsPermissions) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page, params, handleChangeParams } = useQueryParams();
    const { customers, customersMeta } = useTypedSelector(({customers}) => customers);
    const { endpoint: getCustomersEndpoint } = fetchCustomersEndpoint;
    const { isLoading: getCustomersLoading } = useParametricSelector(getCustomersEndpoint);
    const [searchValue, setSearchValue] = useState('');

    const newData = useMemo(() => {
        // @ts-ignore
        const indexArray = chunk(Array.from({length: +customersMeta?.total || 0}, (_, i) => i + 1), params.per_page)
        return customers.map((item: any, index) => {
            item = {...item, nth: indexArray?.[+params.page - 1]?.[index]}
            return item;
        });
    }, [customers]);

    /**  change search value  */
    const changeSearchValue = ({target: {value}}: any) => {
        setSearchValue(value)
    }

    /**  create  */
    const handleCreate = () => {
        navigate(`/customer/create`);
    };

    /**  edt  */
    const handleEdit = (customer: any) => {
        navigate(`/customer/update/${customer.id}`);
    };

    /**  delete  */
    const handleDelete = ({id}: any) => {
        dispatch(deleteCustomer({params, id}));
    };

    /**  on update search value  */
    const onUpdateSearchValue = debounce(() => {
        const paramsData: any = {...params}
        if(searchValue) paramsData.full_name = searchValue;
        dispatch(fetchCustomersRequest(paramsData));
    }, 200);

    /**  on params update handler  */
    const onUpdateHandler = () => {
        dispatch(fetchCustomersRequest(params));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [page]);
    useEffect(onUpdateSearchValue, [searchValue]);
    useMount();

    /**
     * Table columns
     * **/
    const columns: any = useMemo(() => (
        [
            {
                title: 'Row',
                width: '30px',
                dataIndex: 'nth',
            },
            {
                title: <div>
                    <p>Full name</p>
                    <input onChange={changeSearchValue} value={searchValue} placeholder='Search...'/>
                </div>,
                width: '120px',
                dataIndex: 'first_name',
            },
            {
                title: 'Phone',
                width: '100px',
                dataIndex: 'phone',
            },
            {
                width: '100px',
                title: 'Community',
                dataIndex: ['community', 'community_am'],
            },
            {
                width: '100px',
                title: 'Region',
                dataIndex: ['region', 'region_am'],
            },
            {
                width: '100px',
                title: 'Address',
                dataIndex: 'address',
            },
            {
                width: '70px',
                title: 'Operations',
                fixed: 'right' as 'right',
                render: (_: any, record: ICustomers) =>
                    <TableOperations
                        isEdit={edit}
                        isDelete={remove}
                        record={record}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
            },
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [newData, searchValue]);


    return {
        handleCreate,
        page,
        customers: newData,
        columns,
        params,
        customersMeta,
        getCustomersLoading,
        handleChangeParams,
    }
}

export default useContainer;
