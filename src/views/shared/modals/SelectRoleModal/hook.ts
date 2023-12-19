import {useEffect, useState} from "react";
import {RadioChangeEvent} from 'antd';
import {useDispatch} from "react-redux";
import {fetchRolesRequest} from "state/roles/actions";
import useTypedSelector from 'hooks/useTypedSelector';
import {fetchRolesEndpoint} from 'state/roles/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';

interface IProps {
    selectedRoleId?: number,
    onClose: () => void,
    onSelectHandler: any,
}

function useContainer({selectedRoleId, onClose, onSelectHandler}: IProps) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { roles, rolesMeta } = useTypedSelector(({roles}) => roles);
    const { endpoint: getRolesEndpoint } = fetchRolesEndpoint;
    const { isLoading: isFetchingRoles } = useParametricSelector(getRolesEndpoint);
    const [value, setValue] = useState(() => selectedRoleId || 0);
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
        setSelectedValue({name: value.name, id: value.id});
        onSelectHandler({name: value.name, id: value.id});
        onClose();
    }

    /**  on mount handler  */
    const onMountHandler = () => {
        dispatch(fetchRolesRequest({page: String(page), per_page: '8'}));
    }

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMountHandler, [page]);

    return {
        roles,
        isFetchingRoles,
        value,
        onChange,
        setPage,
        rolesMeta,
        page,
        selectedValue,
        onSelect,
        onSave,
    }
}

export default useContainer;