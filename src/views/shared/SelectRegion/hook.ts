import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {debounce, isEmpty} from 'lodash';
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchRegionsRequest} from 'state/regions/actions';

function useContainer({onSelectRegionHandler, region_id}: any) {
    const dispatch = useDispatch();
    const { regions } = useTypedSelector(({regions}) => regions);
    const [selectedValue, setSelectedValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allData, setAllData] = useState<any>([]);

    /** on select handler */
    const onselectHandler = (value: any) => {
        if(value) {
            setSelectedValue(value);
            onSelectRegionHandler(value);
            return;
        }
        setSelectedValue(0);
        onSelectRegionHandler(0);
    }

    /**  select value  */
    const selectValue = useMemo(() => {
        return allData.filter((item: any) => {
            return item.id == selectedValue || item.id == region_id;
        })
    }, [selectedValue, region_id, allData]);

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
        dispatch(fetchRegionsRequest(params));
    }, 100);


    const onUpdateRegions = () => {
        if(!isEmpty(allData)) return;
        setAllData(regions);
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [searchValue]);
    useEffect(onUpdateRegions, [regions]);

    return {
        onSearchHandler,
        regions,
        onselectHandler,
        selectedValue,
        selectValue,
    }
}

export default useContainer;
