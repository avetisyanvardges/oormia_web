import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {debounce, isEmpty} from 'lodash';
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchWarehouseRequest} from 'state/warehouses/actions';

function useContainer({onSelectWarehouseHandler, warehouse_id}: any) {
    const dispatch = useDispatch();
    const { warehouses } = useTypedSelector(({warehouses}) => warehouses);
    const [selectedValue, setSelectedValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allData, setAllData] = useState<any>([]);

    /** on select handler */
    const onselectHandler = (value: any) => {
        if(value) {
            setSelectedValue(value);
            onSelectWarehouseHandler(value);
            return;
        }
        setSelectedValue(0);
        onSelectWarehouseHandler(0);
    }

    /**  select value  */
    const selectValue = useMemo(() => {
        return allData.filter((item: any) => {
            return item.id == selectedValue || item.id == warehouse_id;
        })
    }, [selectedValue, warehouse_id, allData]);

    /** search handler */
    const onSearchHandler = (value: string) => {
        setSearchValue(value);
    }

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        const params = {page: 1, per_page: 2000}
        if(searchValue) { // @ts-ignore
            params.name = searchValue;
        }
        dispatch(fetchWarehouseRequest(params));
    }, 100);


    const onUpdateWearhouses = () => {
        if(!isEmpty(allData)) return;
        setAllData(warehouses);
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [searchValue]);
    useEffect(onUpdateWearhouses, [warehouses]);

    return {
        onselectHandler,
        selectedValue,
        selectValue,
        warehouses,
        onSearchHandler,
    }
}

export default useContainer;