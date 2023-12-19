import {useEffect, useState} from "react";
import {RadioChangeEvent} from 'antd';
import {useDispatch} from "react-redux";
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchRegionsEndpointAll} from 'state/regions/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import {fetchCouriersRequest, fetchUserByUpdateRequest} from "../../../../state/admins/actions";
import {confirmOrderRequest} from '../../../../state/orders/actions';
import {STATUS} from "../../../../constants/statuses";

interface IProps {
    selectedCourierId?: number,
    onClose: () => void,
    onSelectHandler: any,
    tracking_code?: string,
    params?: any,
    fromConfirmOrder?: boolean
}

function useContainer({selectedCourierId, params, onClose, onSelectHandler, tracking_code,fromConfirmOrder}: IProps) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { users, usersMeta } = useTypedSelector(({admins}) => admins);
    const { endpoint: getRegionsEndpoint } = fetchRegionsEndpointAll;
    const { isLoading: isFetchingRegions } = useParametricSelector(getRegionsEndpoint);
    const [value, setValue] = useState(() => selectedCourierId || 0);
    const [selectedValue, setSelectedValue] = useState<any>({});

    // TODO - on save handler
    const onSave = () => {
        dispatch(fetchUserByUpdateRequest(selectedValue.id, (customer) => {
            onSelectHandler({
                courier: customer,
                id: selectedValue.id
            });
        }));
        onClose();

    };

    const onConfirmOrder = (courierId: any) => {
        const data = {
            tracking_code,
            sender_courier_id: courierId,
        }
        if(!data.sender_courier_id) delete data.sender_courier_id;
        dispatch(confirmOrderRequest({
            data,
            params: {
                ...params,
                // status: STATUS.IN_PROCESS,
            },
        }))
    }

    // TODO - on change handler
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    // TODO - on select handler
    const onSelect = (value: any) => {
        setSelectedValue(value);
        dispatch(fetchUserByUpdateRequest(value.id, (customer) => {
            onSelectHandler({
                courier: customer,
                id: value.id
            });
        }));
        if(fromConfirmOrder) onConfirmOrder(value.id);
        onClose();
    }

    // TODO - on mount handler
    const onMountHandler = () => {
        dispatch(fetchCouriersRequest({page: String(page), per_page: '8'}));
    }

    // TODO - Lifecycle
    useEffect(onMountHandler, [page]);

    return {
        users,
        usersMeta,
        isFetchingRegions,
        value,
        onChange,
        setPage,
        page,
        selectedValue,
        onSelect,
        onSave,
        onConfirmOrder,
    };
}

export default useContainer;
