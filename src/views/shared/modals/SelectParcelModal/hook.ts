import {useEffect, useState} from "react";
import {RadioChangeEvent} from 'antd';
import {useDispatch} from "react-redux";
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchUsersEndpoint} from 'state/admins/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import {fetchUsersRequest} from 'state/admins/actions';
import {fetchParcelRequest} from "../../../../state/parcel/actions";
import {fetchParcelsEndpoint} from "../../../../state/parcel/endpoints";

interface IProps {
    selectedParcelId?: number,
    onClose: () => void,
    onSelectHandler: any,
}

function useContainer({selectedParcelId, onClose, onSelectHandler}: IProps) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { parcel, parcelMeta } = useTypedSelector(({parcels}) => parcels);
    const { endpoint: getParcelEndpoint } = fetchParcelsEndpoint;
    const { isLoading: isFetchingParcel} = useParametricSelector(getParcelEndpoint);
    const [value, setValue] = useState(() => selectedParcelId || 0);
    const [selectedValue, setSelectedValue] = useState<any>({});

    /**  on save handler  */
    const onSave = () => {
        onSelectHandler(selectedValue.id);
        onClose();
    };

    /**  on change handler  */
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    /**  on select handler  */
    const onSelect = (value: any) => {
        setSelectedValue(value);
        // onSelectHandler(value);
    }

    /**  on mount handler  */
    const onMountHandler = () => {
        dispatch(fetchParcelRequest({page: String(page), per_page: '8'}));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMountHandler, [page]);

    return {
        parcel,
        isFetchingParcel,
        value,
        onChange,
        setPage,
        parcelMeta,
        page,
        selectedValue,
        onSelect,
        onSave,
    }
}

export default useContainer;
