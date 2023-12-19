import {useEffect, useMemo, useState} from 'react';
import {debounce, isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchCustomersRequest} from 'state/customers/actions';
import {fetchUsersRequest} from '../../../state/admins/actions';

function useContainer({onSelectUserHandler, userId}: any) {
    const dispatch = useDispatch();
    const { users } = useTypedSelector(({admins}) => admins);
    const [selectedValue, setSelectedValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allData, setAllData] = useState<any>([]);

    const onchangeSelectValue = () => {
        const data = users.reduce((acc: any, item) => {
            // @ts-ignore
            if(item.id == selectedValue) {
                acc = item;
            }
            return acc;
        }, {})
        onSelectUserHandler(data.id);
    }

    /** search handler */
    const onSearchHandler = (value: string) => {
        setSearchValue(value);
    }

    /** on select handler */
    const onselectHandler = (value: any) => {
        if(value) {
            setSelectedValue(value);
            setSearchValue('')
            return;
        }
        setSelectedValue(0);
        onSelectUserHandler('');
    }

    /**  select value  */
    const selectValue = useMemo(() => {
        return allData.filter((item: any) => {
            return item.id == selectedValue || item.id == userId;
        })
    }, [selectedValue, userId, allData]);

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        const params = {page: 1, per_page: 2000}
        if(searchValue) { // @ts-ignore
            params.full_name = searchValue;
        }
        dispatch(fetchUsersRequest(params));
    }, 100);

    const onUpdateCustomers = () => {
        if(!isEmpty(allData)) return;
        setAllData(users);
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [searchValue]);
    useEffect(onchangeSelectValue, [selectedValue]);
    useEffect(onUpdateCustomers, [users]);

    return {
        onselectHandler,
        onSearchHandler,
        selectedValue,
        selectValue,
        users,
    }
}

export default useContainer;
