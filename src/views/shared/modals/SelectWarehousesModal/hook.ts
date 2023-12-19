import {useEffect, useState} from "react";
import {RadioChangeEvent} from 'antd';
import {useDispatch} from "react-redux";
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchRegionsEndpointAll} from 'state/regions/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import {fetchWarehousesRequest} from "state/warehouses/actions";

interface IProps {
    selectedRegionId?: number,
    onClose: () => void,
    onSelectHandler: any,
}

function useContainer({selectedRegionId, onClose, onSelectHandler}: IProps) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { warehouses, warehousesMeta } = useTypedSelector(({warehouses}) => warehouses);
    const { endpoint: getRegionsEndpoint } = fetchRegionsEndpointAll;
    const { isLoading: isFetchingRegions } = useParametricSelector(getRegionsEndpoint);
    const [value, setValue] = useState(() => selectedRegionId || 0);
    const [selectedValue, setSelectedValue] = useState<any>({});

    /**  on save handler  */
    const onSave = () => {
        onSelectHandler({
            warehouse: selectedValue.warehouse_am,
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
            warehouse: value.warehouse_am,
            id: value.id
        });
        onClose();
    }

    /**  on mount handler  */
    const onMountHandler = () => {
        dispatch(fetchWarehousesRequest({page: String(page), per_page: '8'}));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMountHandler, [page]);

    return {
        warehouses,
        isFetchingRegions,
        value,
        onChange,
        setPage,
        warehousesMeta,
        page,
        selectedValue,
        onSelect,
        onSave,
    }
}

export default useContainer;
