import {useEffect, useState} from "react";
import {RadioChangeEvent} from 'antd';
import {useDispatch} from "react-redux";
import {fetchCommunitiesRequest} from "state/regions/actions";
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchCommunitiesEndpoint} from 'state/regions/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import {debounce} from "lodash";

interface IProps {
    selectedCommunityId?: number,
    onClose: () => void,
    onSelectHandler: any,
    selectedRegionId?: number;
}

function useContainer({selectedCommunityId, onClose, onSelectHandler, selectedRegionId}: IProps) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const {communities, communitiesMeta} = useTypedSelector(({regions}) => regions);
    const {endpoint: getCommunitiesEndpoint} = fetchCommunitiesEndpoint;
    const {isLoading: isFetchingCommunities} = useParametricSelector(getCommunitiesEndpoint);
    const [value, setValue] = useState(() => selectedCommunityId || 0);
    const [selectedValue, setSelectedValue] = useState<any>({});
    const [searchValue, setSearchValue] = useState<string>('');

    /**  on search handler  */
    const onSearch = (value: any) => {
        setSearchValue(value);
    }

    /**  on save handler  */
    const onSave = () => {
        onSelectHandler({
            community: selectedValue.community,
            id: selectedValue.id
        });
        onClose();
    };

    /**  on change handler  */
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    /**  on select handler  */
    const onSelect = (value: any) => {
        setSelectedValue(value);
        onSelectHandler({
            community: value.community_am,
            id: value.id
        });
        onClose();
    }

    /**  on mount handler  */
    const onMountHandler = () => {
        // @ts-ignore
        dispatch(fetchCommunitiesRequest({
            page: String(page),
            per_page: '8',
            region_id: selectedRegionId,
            name: String(searchValue),
        }));
    }

    /**  on params update handler  */
    const onUpdateHandler = debounce(() => {
        const params = {
            page: 1, per_page: 10, region_id: selectedRegionId
        }
        if(searchValue) { // @ts-ignore
            params.name = searchValue;
        }
        dispatch(fetchCommunitiesRequest(params));
    }, 100);

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [searchValue]);

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMountHandler, [page, searchValue]);

    return {
        communities,
        isFetchingCommunities,
        value,
        onChange,
        setPage,
        communitiesMeta,
        page,
        selectedValue,
        onSelect,
        onSave,
        onSearch,
    }
}

export default useContainer;
