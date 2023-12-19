import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {debounce, isEmpty} from 'lodash';
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchCouriersRequest} from 'state/admins/actions';

function useContainer({onSelectCourierHandler, courier_id}: any) {
    const dispatch = useDispatch();
    const { users } = useTypedSelector(({admins}) => admins);
    const [selectedValue, setSelectedValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allData, setAllData] = useState<any>([]);

    /** on select handler */
    const onselectHandler = (value: any) => {
        if(value) {
            setSelectedValue(value);
            onSelectCourierHandler(value);
            return;
        }
        setSelectedValue(0);
        onSelectCourierHandler(0);
    }

    /**  select value  */
    const selectValue = useMemo(() => {
        return allData.filter((item: any) => {
            return item.id == selectedValue || item.id == courier_id;
        })
    }, [selectedValue, courier_id, allData]);

    /** search handler */
    const onSearchHandler = (value: string) => {
        setSearchValue(value);
    }

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        const params = {page: 1, per_page: 2000}
        if(searchValue) { // @ts-ignore
            params.full_name = searchValue;
        }
        dispatch(fetchCouriersRequest(params));
    }, 400);

    const onUpdateCourier = () => {
        if(!isEmpty(allData)) return;
        setAllData(users);
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [searchValue]);
    useEffect(onUpdateCourier, [users]);

    return {
        users,
        onselectHandler,
        selectedValue,
        selectValue,
        onSearchHandler,
    }
}

export default useContainer;
