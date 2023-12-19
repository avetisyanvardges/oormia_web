import {useEffect, useState} from "react";
import {RadioChangeEvent} from 'antd';
import {useDispatch} from "react-redux";
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchUsersEndpoint} from 'state/admins/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import {fetchUsersRequest} from 'state/admins/actions';

interface IProps {
    selectedUserId?: number,
    onClose: () => void,
    onSelectHandler: any,
}

function useContainer({selectedUserId, onClose, onSelectHandler}: IProps) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { users, usersMeta } = useTypedSelector(({admins}) => admins);
    const { endpoint: getUsersEndpoint } = fetchUsersEndpoint;
    const { isLoading: isFetchingUsers} = useParametricSelector(getUsersEndpoint);
    const [value, setValue] = useState(() => selectedUserId || 0);
    const [selectedValue, setSelectedValue] = useState<any>({});

    /**  on save handler  */
    const onSave = () => {
        onSelectHandler(selectedValue);
        onClose();
    };

    /**  on change handler  */
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    /**  on select handler  */
    const onSelect = (value: any) => {
        setSelectedValue(value);
        onSelectHandler(value);
        onClose();
    }

    /**  on mount handler  */
    const onMountHandler = () => {
        dispatch(fetchUsersRequest({page: String(page), per_page: '8'}));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMountHandler, [page]);

    return {
        users,
        isFetchingUsers,
        value,
        onChange,
        setPage,
        usersMeta,
        page,
        selectedValue,
        onSelect,
        onSave,
    }
}

export default useContainer;
