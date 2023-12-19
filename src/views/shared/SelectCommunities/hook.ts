import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {debounce, isEmpty} from 'lodash';
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchCommunitiesRequest} from 'state/regions/actions';

function useContainer({onSelectCommunityHandler, selectedRegion, community_id}: any) {
    const dispatch = useDispatch();
    const { communities } = useTypedSelector(({regions}) => regions);
    const [selectedValue, setSelectedValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allData, setAllData] = useState<any>([]);

    /** on select handler */
    const onselectHandler = (value: any) => {
        if(value) {
            setSelectedValue(value);
            onSelectCommunityHandler(value);
            return;
        }
        setSelectedValue(0);
        onSelectCommunityHandler(0);
    }

    /**  select value  */
    const selectValue = useMemo(() => {
        return allData.filter((item: any) => {
            return item.id == selectedValue || item.id == community_id;
        })
    }, [selectedValue, community_id, allData]);

    /**  select value  */
    const onSearchHandler = (value: string) => {
        setSearchValue(value);
    }

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        const params = {
            page: 1, per_page: 2000, region_id: selectedRegion
        }
        if(searchValue) { // @ts-ignore
            params.name = searchValue;
        }
        dispatch(fetchCommunitiesRequest(params));
    }, 100);

    const onUpdateCommunities = () => {
        if(!isEmpty(allData)) return;
        setAllData(communities);
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [selectedRegion, searchValue]);
    useEffect(onUpdateCommunities, [communities]);

    return {
        communities,
        onselectHandler,
        selectedValue,
        selectValue,
        onSearchHandler,
    }
}

export default useContainer;