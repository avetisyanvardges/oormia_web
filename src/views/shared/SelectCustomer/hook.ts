import {useEffect, useMemo, useState} from 'react';
import {debounce, isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchCustomersRequest} from 'state/customers/actions';

function useContainer({onSelectCustomerHandler, customerId, title}: any) {
    const dispatch = useDispatch();
    const { customers } = useTypedSelector(({customers}) => customers);
    const [selectedValue, setSelectedValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allData, setAllData] = useState<any>([]);

    const onchangeSelectValue = () => {
        const data = customers.reduce((acc: any, item) => {
            if(item.id == selectedValue) {
                acc = item;
            }
            return acc;
        }, {})
        onSelectCustomerHandler(title.toLowerCase(), data);
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
        onSelectCustomerHandler(title.toLowerCase(), {});
    }

    /**  select value  */
    const selectValue = useMemo(() => {
        return allData.filter((item: any) => {
            return item.id == selectedValue || item.id == customerId;
        })
    }, [selectedValue, customerId, allData]);

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        const params = {page: 1, per_page: 2000}
        if(searchValue) { // @ts-ignore
            params.full_name = searchValue;
        }
        dispatch(fetchCustomersRequest(params));
    }, 100);

    const onUpdateCustomers = () => {
        if(!isEmpty(allData)) return;
        setAllData(customers);
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [searchValue]);
    useEffect(onchangeSelectValue, [selectedValue]);
    useEffect(onUpdateCustomers, [customers]);

    return {
        onselectHandler,
        onSearchHandler,
        selectedValue,
        selectValue,
        customers,
    }
}

export default useContainer;
